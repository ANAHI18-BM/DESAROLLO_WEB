import os
import sqlite3
from flask import Flask, render_template, redirect, url_for, flash
from forms import ProductoForm, ClienteForm, ProveedorForm, FacturacionForm

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
DB_PATH = os.path.join(DATA_DIR, 'ferreterialinda_fashion.db')

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'linda-fashion-boutique-clave-local')
app.config['WTF_CSRF_ENABLED'] = True
os.makedirs(DATA_DIR, exist_ok=True)


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute('PRAGMA foreign_keys = ON')
    return conn


def init_db():
    conn = get_connection()
    try:
        conn.executescript('''
            CREATE TABLE IF NOT EXISTS productos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                categoria TEXT NOT NULL,
                descripcion TEXT NOT NULL,
                talla TEXT NOT NULL,
                precio REAL NOT NULL,
                estado TEXT NOT NULL,
                imagen TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS clientes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                correo TEXT NOT NULL,
                telefono TEXT NOT NULL,
                direccion TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS proveedores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                correo TEXT NOT NULL,
                telefono TEXT NOT NULL,
                producto TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS facturacion (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cliente_id INTEGER NOT NULL,
                producto_id INTEGER NOT NULL,
                cantidad INTEGER NOT NULL,
                precio_unitario REAL NOT NULL,
                total REAL NOT NULL,
                fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (cliente_id) REFERENCES clientes(id),
                FOREIGN KEY (producto_id) REFERENCES productos(id)
            );
        ''')
        total = conn.execute('SELECT COUNT(*) FROM productos').fetchone()[0]
        if total == 0:
            productos_iniciales = [
                ('Vestido Floral Elegante', 'Vestidos', 'Diseño suave y femenino, ideal para eventos especiales y reuniones.', 'M', 45.99, 'Disponible', 'vestido.jpg'),
                ('Blusa de Encaje Moderna', 'Blusas', 'Confeccionada con materiales ligeros, combina comodidad y estilo.', 'S', 29.99, 'Disponible', 'ropa3.jpg'),
                ('Conjunto Formal', 'Conjuntos', 'Conjunto completo para ocasiones formales, corte entallado y elegante.', 'L', 62.50, 'Disponible', 'ropa.jpg')
            ]
            conn.executemany('''INSERT INTO productos
                (nombre, categoria, descripcion, talla, precio, estado, imagen)
                VALUES (?, ?, ?, ?, ?, ?, ?)''', productos_iniciales)
            conn.commit()
    finally:
        conn.close()


@app.route('/', methods=['GET', 'POST'])
def index():
    form = ProductoForm()
    if form.validate_on_submit():
        conn = get_connection()
        try:
            conn.execute('''INSERT INTO productos
                (nombre, categoria, descripcion, talla, precio, estado, imagen)
                VALUES (?, ?, ?, ?, ?, ?, ?)''',
                (form.nombre.data.strip(), form.categoria.data,
                 form.descripcion.data.strip(), form.talla.data,
                 float(form.precio.data), form.estado.data, 'ropa.jpg'))
            conn.commit()
        finally:
            conn.close()
        flash('Prenda registrada correctamente en Linda Fashion Boutique.', 'success')
        return redirect(url_for('index'))

    conn = get_connection()
    try:
        productos = conn.execute('SELECT * FROM productos ORDER BY id').fetchall()
    finally:
        conn.close()
    return render_template('index.html', form=form, productos=productos)


@app.route('/productos')
def productos():
    conn = get_connection()
    try:
        registros = conn.execute('SELECT * FROM productos ORDER BY id DESC').fetchall()
    finally:
        conn.close()
    return render_template('productos.html', productos=registros)


@app.route('/productos/nuevo', methods=['GET', 'POST'])
def formulario_producto():
    form = ProductoForm()
    if form.validate_on_submit():
        conn = get_connection()
        try:
            conn.execute('''INSERT INTO productos
                (nombre, categoria, descripcion, talla, precio, estado, imagen)
                VALUES (?, ?, ?, ?, ?, ?, ?)''',
                (form.nombre.data.strip(), form.categoria.data,
                 form.descripcion.data.strip(), form.talla.data,
                 float(form.precio.data), form.estado.data, 'ropa.jpg'))
            conn.commit()
        finally:
            conn.close()
        flash('Producto guardado correctamente.', 'success')
        return redirect(url_for('productos'))
    return render_template('formulario_producto.html', form=form)


@app.route('/clientes', methods=['GET', 'POST'])
def clientes():
    form = ClienteForm()
    if form.validate_on_submit():
        conn = get_connection()
        try:
            conn.execute('INSERT INTO clientes (nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)',
                         (form.nombre.data.strip(), form.correo.data.strip(), form.telefono.data.strip(), form.direccion.data.strip()))
            conn.commit()
        finally:
            conn.close()
        flash('Cliente registrado correctamente.', 'success')
        return redirect(url_for('clientes'))
    conn = get_connection()
    try:
        registros = conn.execute('SELECT * FROM clientes ORDER BY id DESC').fetchall()
    finally:
        conn.close()
    return render_template('clientes.html', form=form, clientes=registros)


@app.route('/clientes/nuevo', methods=['GET', 'POST'])
def formulario_cliente():
    form = ClienteForm()
    if form.validate_on_submit():
        conn = get_connection()
        try:
            conn.execute('INSERT INTO clientes (nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)',
                         (form.nombre.data.strip(), form.correo.data.strip(), form.telefono.data.strip(), form.direccion.data.strip()))
            conn.commit()
        finally:
            conn.close()
        flash('Cliente registrado correctamente.', 'success')
        return redirect(url_for('clientes'))
    return render_template('formulario_cliente.html', form=form)


@app.route('/proveedores', methods=['GET', 'POST'])
def proveedores():
    form = ProveedorForm()
    if form.validate_on_submit():
        conn = get_connection()
        try:
            conn.execute('INSERT INTO proveedores (nombre, correo, telefono, producto) VALUES (?, ?, ?, ?)',
                         (form.nombre.data.strip(), form.correo.data.strip(), form.telefono.data.strip(), form.producto.data.strip()))
            conn.commit()
        finally:
            conn.close()
        flash('Proveedor registrado correctamente.', 'success')
        return redirect(url_for('proveedores'))
    conn = get_connection()
    try:
        registros = conn.execute('SELECT * FROM proveedores ORDER BY id DESC').fetchall()
    finally:
        conn.close()
    return render_template('proveedores.html', form=form, proveedores=registros)


@app.route('/proveedores/nuevo', methods=['GET', 'POST'])
def formulario_proveedor():
    form = ProveedorForm()
    if form.validate_on_submit():
        conn = get_connection()
        try:
            conn.execute('INSERT INTO proveedores (nombre, correo, telefono, producto) VALUES (?, ?, ?, ?)',
                         (form.nombre.data.strip(), form.correo.data.strip(), form.telefono.data.strip(), form.producto.data.strip()))
            conn.commit()
        finally:
            conn.close()
        flash('Proveedor registrado correctamente.', 'success')
        return redirect(url_for('proveedores'))
    return render_template('formulario_proveedor.html', form=form)


@app.route('/facturacion', methods=['GET', 'POST'])
def facturacion():
    conn = get_connection()
    try:
        clientes = conn.execute('SELECT id, nombre FROM clientes ORDER BY nombre').fetchall()
        productos = conn.execute('SELECT id, nombre, precio FROM productos ORDER BY nombre').fetchall()
        facturas = conn.execute('''SELECT f.*, c.nombre AS cliente, p.nombre AS producto
                                   FROM facturacion f
                                   JOIN clientes c ON c.id = f.cliente_id
                                   JOIN productos p ON p.id = f.producto_id
                                   ORDER BY f.id DESC''').fetchall()
    finally:
        conn.close()
    form = FacturacionForm()
    form.cliente_id.choices = [(r['id'], r['nombre']) for r in clientes]
    form.producto_id.choices = [(r['id'], r['nombre']) for r in productos]
    if form.validate_on_submit():
        conn = get_connection()
        try:
            producto = conn.execute('SELECT precio FROM productos WHERE id = ?', (form.producto_id.data,)).fetchone()
            if producto is None:
                flash('El producto seleccionado no existe.', 'danger')
                return render_template('facturacion.html', form=form, facturas=facturas)
            precio = float(form.precio_unitario.data)
            total = precio * form.cantidad.data
            conn.execute('''INSERT INTO facturacion
                (cliente_id, producto_id, cantidad, precio_unitario, total)
                VALUES (?, ?, ?, ?, ?)''',
                (form.cliente_id.data, form.producto_id.data, form.cantidad.data, precio, total))
            conn.commit()
        finally:
            conn.close()
        flash('Factura registrada correctamente.', 'success')
        return redirect(url_for('facturacion'))
    return render_template('facturacion.html', form=form, facturas=facturas)


@app.route('/facturacion/nueva', methods=['GET', 'POST'])
def formulario_facturacion():
    form = FacturacionForm()
    conn = get_connection()
    try:
        clientes = conn.execute('SELECT id, nombre FROM clientes ORDER BY nombre').fetchall()
        productos = conn.execute('SELECT id, nombre FROM productos ORDER BY nombre').fetchall()
    finally:
        conn.close()
    form.cliente_id.choices = [(r['id'], r['nombre']) for r in clientes]
    form.producto_id.choices = [(r['id'], r['nombre']) for r in productos]
    if form.validate_on_submit():
        conn = get_connection()
        try:
            producto = conn.execute('SELECT id FROM productos WHERE id = ?', (form.producto_id.data,)).fetchone()
            if producto is None:
                flash('El producto seleccionado no existe.', 'danger')
                return render_template('formulario_facturacion.html', form=form)
            precio = float(form.precio_unitario.data)
            total = precio * form.cantidad.data
            conn.execute('''INSERT INTO facturacion
                (cliente_id, producto_id, cantidad, precio_unitario, total)
                VALUES (?, ?, ?, ?, ?)''',
                (form.cliente_id.data, form.producto_id.data, form.cantidad.data, precio, total))
            conn.commit()
        finally:
            conn.close()
        flash('Factura registrada correctamente.', 'success')
        return redirect(url_for('facturacion'))
    return render_template('formulario_facturacion.html', form=form)


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
