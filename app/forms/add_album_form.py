from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Album


class AddAlbumForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
