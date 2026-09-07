from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, DecimalField
from wtforms.validators import DataRequired, Length, NumberRange

class ProductoForm(FlaskForm):
    nombre = StringField(
        "Nombre de la prenda",
        validators=[DataRequired(message="El nombre de la prenda es obligatorio."),
                    Length(min=4, message="El nombre debe tener al menos 4 caracteres.")]
    )
    categoria = SelectField(
        "Categoría",
        choices=[
            ("", "Seleccione una categoría"),
            ("Vestidos", "Vestidos"),
            ("Blusas", "Blusas"),
            ("Jeans", "Jeans"),
            ("Conjuntos", "Conjuntos"),
            ("Accesorios", "Accesorios"),
        ],
        validators=[DataRequired(message="Debe seleccionar una categoría.")]
    )
    descripcion = TextAreaField(
        "Descripción",
        validators=[DataRequired(message="La descripción es obligatoria."),
                    Length(min=10, message="La descripción debe tener al menos 10 caracteres.")]
    )
    talla = SelectField(
        "Talla",
        choices=[
            ("", "Seleccione una talla"),
            ("XS", "XS"), ("S", "S"), ("M", "M"), ("L", "L"), ("XL", "XL")
        ],
        validators=[DataRequired(message="Debe seleccionar una talla.")]
    )
    precio = DecimalField(
        "Precio ($)",
        places=2,
        validators=[DataRequired(message="El precio es obligatorio."),
                    NumberRange(min=0.01, message="El precio debe ser mayor a 0.")]
    )
    estado = SelectField(
        "Estado",
        choices=[
            ("", "Seleccione el estado"),
            ("Disponible", "Disponible"),
            ("Agotado", "Agotado"),
            ("Próximamente", "Próximamente"),
        ],
        validators=[DataRequired(message="Debe seleccionar el estado de la prenda.")]
    )
