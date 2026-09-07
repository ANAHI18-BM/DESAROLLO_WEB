from flask_wtf import FlaskForm
from wtforms import SelectField, IntegerField, DecimalField
from wtforms.validators import DataRequired, NumberRange

class FacturacionForm(FlaskForm):
    cliente_id = SelectField('Cliente', coerce=int, validators=[DataRequired()])
    producto_id = SelectField('Producto', coerce=int, validators=[DataRequired()])
    cantidad = IntegerField('Cantidad', validators=[DataRequired(), NumberRange(min=1)])
    precio_unitario = DecimalField('Precio unitario ($)', places=2, validators=[DataRequired(), NumberRange(min=0.01)])
