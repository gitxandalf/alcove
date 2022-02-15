from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Article


class EditArticleForm(FlaskForm):
    image_url = StringField("Image Url", validators=[DataRequired()])
    title = StringField("Title", validators=[DataRequired()])
    article_content = TextAreaField(
        'Article Content', validators=[DataRequired()])
