from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Image, Album


class AddImageForm(FlaskForm):
    album_id = StringField("Album", validators=[DataRequired()])
    image_url = StringField("Image Url", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
