
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField, TextAreaField
from wtforms.validators import DataRequired, ValidationError


class EditCommentForm(FlaskForm):
    comment_content = TextAreaField('Content', validators=[DataRequired()])
