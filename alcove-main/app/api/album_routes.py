from flask import Blueprint
from app.models import Album, Image

album_routes = Blueprint(
    'albums', __name__)


@album_routes.route('/')
def albums():
    # Route to GET all available Albums
    albums = Album.query.all()
    return {'albums': [album.to_dict() for album in albums]}


@album_routes.route('/<int:id>/images')
def images_by_album(id):
    # GET Route for all data for all images under a certain Album
    album = Album.query.get(id)
    images = Image.query.filter(Image.category_id == id).all()
    return {'album': album.to_dict(), 'images': [image.to_dict() for image in images]}
