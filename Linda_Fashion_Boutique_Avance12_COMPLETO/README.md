# Linda Fashion Boutique — Avance 12/16

Proyecto Integrador de Desarrollo de Aplicaciones Web. Se conserva la interfaz de Linda Fashion Boutique y se incorpora persistencia local con Flask, Flask-WTF, WTForms y SQLite.

## Estructura

```text
Linda Fashion Boutique/
│
├── app.py
├── requirements.txt
│
├── data/
│   └── linda_fashion.db
│
├── forms/
│   ├── __init__.py
│   ├── producto_form.py
│   ├── cliente_form.py
│   ├── proveedor_form.py
│   └── facturacion_form.py
│
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── productos.html
│   ├── formulario_producto.html
│   ├── clientes.html
│   ├── formulario_cliente.html
│   ├── proveedores.html
│   ├── formulario_proveedor.html
│   ├── facturacion.html
│   ├── formulario_facturacion.html
│   └── components/
│       ├── navbar.html
│       └── footer.html
│
└── static/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── img/
    │   └── imágenes del proyecto
    └── video/
        └── Video de ropa.mp4
```

## Ejecución local

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Crear/activar un entorno virtual si se desea.
3. Instalar dependencias:

```bash
pip install -r requirements.txt
```

4. Ejecutar:

```bash
python app.py
```

5. Abrir `http://127.0.0.1:5000`.

## Persistencia

La base `data/linda_fashion.db` se crea/actualiza sin borrar los registros existentes. Los productos se validan con Flask-WTF, se guardan mediante un `INSERT` parametrizado con `?`, se confirma con `commit()` y se recuperan mediante `SELECT` y `fetchall()` para mostrarlos con Jinja2.

Para comprobar la persistencia: registrar un producto, detener Flask con `Ctrl+C`, ejecutar nuevamente `python app.py` y volver a consultar la colección o la página de Productos.

GitHub Pages no ejecuta Flask ni SQLite; la evidencia de backend debe comprobarse localmente.
