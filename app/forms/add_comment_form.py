from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField, TextAreaField
from wtforms.validators import DataRequired, ValidationError



class AddCommentForm(FlaskForm):
    content = TextAreaField('Comment Content', validators=[DataRequired()])