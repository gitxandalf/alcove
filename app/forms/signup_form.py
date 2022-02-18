from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def valid_url(form, field):
    profile_image_url = field.data
    if (len(profile_image_url) > 255 or len(profile_image_url) <= 0):
        raise ValidationError("Image Url is must be less 255 characters")
    if (not profile_image_url.__contains__("http" or "https")):
        raise ValidationError("Please provide a valid image Url")


def valid_email(form, field):
    email = field.data
    if (not email.__contains__("@")):
        raise ValidationError("Please provide a valid email")
    if (not email.__contains__(".com") and not email.__contains__(".io")):
        raise ValidationError(
            "Please provide a valid email suffix (.com or .io)")
    # if (not email.__contains__(".io")):
    #     raise ValidationError(
    #         "Please provide a valid email suffix (.com or .io)")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    profile_image_url = StringField(
        "profile_image_url", validators=[DataRequired(), valid_url])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired()])
