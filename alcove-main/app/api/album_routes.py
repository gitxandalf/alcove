from flask import Blueprint, request
from flask_login import login_required
from app.models import Image, User, Album, db
from app.forms import AddAlbumForm, EditAlbumForm

album_routes = Blueprint(
    'albums', __name__)


@album_routes.route('/')
@login_required
def albums():
    # Route to GET all available Albums
    albums = Album.query.all()
    return {'albums': [album.to_dict() for album in albums]}


@album_routes.route('/<int:id>/images')
@login_required
def images_by_album(id):
    # GET Route for all data for all images under a certain Album
    album = Album.query.get(id)
    images = Image.query.filter(Image.album_id == id).all()
    return {'album': album.to_dict(), 'images': [image.to_dict() for image in images]}


@album_routes.route('/add-album', methods=['POST'])
@login_required
def post_album():
    data = request.json
    form = AddAlbumForm()
    print("FORM DATA________>", form.data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        album = Album(
            user_id=data["user_id"],
            name=form.data['name'],
            description=form.data['description']
        )
        db.session.add(album)
        db.session.commit()
        return album.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@album_routes.route('/<int:albumId>/edit-album', methods=['PUT'])
@login_required
def edit_album(albumId):
    data = request.json
    form = EditAlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    currentAlbum = Image.query.get(imageId)

    if form.validate_on_submit() and currentAlbum:

        currentAlbum.user_id = data["user_id"]
        currentAlbum.name = form.data['name']
        currentAlbum.description = form.data['description']

        db.session.commit()
        return currentAlbum.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@album_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_album(id):
    currentAlbum = Album.query.get(id)
    db.session.delete(currentAlbum)
    db.session.commit()
    return "Delete Successful"
