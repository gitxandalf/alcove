from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Image, Album, Article

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/images')
@login_required
def user_images(id):
    user = User.query.get(id)
    images = Image.query.filter(Image.user_id == id).all()
    return {'user': user.to_dict(), 'images': [image.to_dict() for image in images]}


@user_routes.route('/<int:id>/albums')
@login_required
def user_albums(id):
    user = User.query.get(id)
    albums = Album.query.filter(Album.user_id == id).all()
    return {'user': user.to_dict(), 'albums': [album.to_dict() for album in albums]}


@user_routes.route('/<int:user_id>/albums/<int:album_id>/images')
@login_required
def user_albums_images(user_id, album_id):
    user = User.query.get(user_id)
    album = Album.query.get(album_id)
    images = Image.query.filter(Image.album_id == album_id).all()
    return {'user': user.to_dict(), 'images': [image.to_dict() for image in images], 'album': album.to_dict()}


@user_routes.route('/<int:id>/articles')
@login_required
def user_articles(id):
    user = User.query.get(id)
    articles = Article.query.filter(Article.user_id == id).all()
    return {'user': user.to_dict(), 'articles': [article.to_dict() for article in articles]}


@user_routes.route('/<int:user_id>/articles/<int:article_id>')
@login_required
def user_article(user_id, article_id):
    user = User.query.get(user_id)
    article = Article.query.get(article_id)
    return {'user': user.to_dict(), 'article': article.to_dict()}
