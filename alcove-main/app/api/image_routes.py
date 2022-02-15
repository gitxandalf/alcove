from flask import Blueprint, request
from flask_login import login_required
from app.models import Image, User, Comment, Album, db
from app.forms import AddImageForm, EditImageForm


image_routes = Blueprint(
    'images', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@image_routes.route('/')
def images():
    # GET Route for all images regardless of album
    # At top of profile page, should be a NavLink to Albums (page listing each album)
    # Once NavLink for a certain Album is clicked, user would be routed to images_by_album(id)
    images = Image.query.order_by(Image.id).all()
    users = User.query.all()
    return {'images': [image.to_dict() for image in images], 'users': [user.to_dict() for user in users]}


@image_routes.route('/<int:id>')
def image(id):
    # GET Route for all data for a specified image
    image = Image.query.get(id)
    users = User.query.all()
    comments = Comment.query.filter(Comment.product_id == id).all()
    return {'image': image.to_dict(), 'comments': [comment.to_dict() for comment in comments], 'users': [user.to_dict() for user in users]}


@image_routes.route('/add-image', methods=['POST'])
@login_required
def post_image():
    data = request.json
    form = AddImageForm()
    print("FORM DATA________>", form.data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = Image(
            user_id=data["user_id"],
            album_id=data["album_id"],
            image_url=form.data['image_url'],
            name=form.data['name'],
            description=form.data['description']
        )
        db.session.add(image)
        db.session.commit()
        return image.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@image_routes.route('/<int:imageId>/edit-image', methods=['PUT'])
@login_required
def edit_image(imageId):
    data = request.json
    form = EditImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    currentImage = Image.query.get(imageId)

    if form.validate_on_submit() and currentImage:

        currentImage.album_id = data["album_id"]
        currentImage.name = form.data['name']
        currentImage.image_url = form.data['image_url']
        currentImage.description = form.data['description']

        db.session.commit()
        return currentImage.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@image_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_image(id):
    currentImage = Image.query.get(id)
    db.session.delete(currentImage)
    db.session.commit()
    return "Delete Successful"
