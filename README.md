# [Alcove](https://alcove-aa.herokuapp.com/)

• is an indirect [Unsplash](https://unsplash.com/) clone made by [Alexander Gangemi](https://www.linkedin.com/in/alexander-gangemi/) for the purpose of course work in [App Academy](https://www.appacademy.io/) and for use as an addition to his professional portfolios. All content is for private, educational, non-commerical, non-profit use.

• On this site, users will be able to post images and blog posts as well as search the site for other users images and blogs.

## Technologies Used:

Javascript | Python | Node.js | NPM | Flask | SQLAlchemy | Alembic | Git | HTML / JSX | CSS | React | Redux | Heroku

## Production Image of Home Page

![HomePage](https://i.imgur.com/Vh3wn9h.png)

## In order to run this application...

### Either:

#### A. Go to [Alcove]() in your browser

### OR

#### B: Clone / Download this repo and...

## Installation 

To install Alcove on your local machine please clone the project repository. 

•  `git clone ` git@github.com:gitxandalf/alcove.git

•  `cd ` change into the frontend directory in `/react-app`

•  `npm install` dependencies from the package.json within the frontend directory 

•  `cd ` change into the root directory 

•  `pipenv install` dependencies from the Pipfile within the backend directory

•  `pipenv shell` to enter the pipenv shell 

•  `flask run` while in the shell and within the backend () directory under localhost:5000

•  `npm start` within the frontend directory() under localhost:3000

## Future Features:

• Article

• Comments

## Technical Implementation:

### Before starting to code: 

• As with any significant undertaking, planning is a crucial step ***especially when we were given one week to complete this project with two full features ( potentially four: being albums, images, articles and comments.)*** I had to consider how closely I wanted to clone [Unsplash](https://unsplash.com/), how I wanted the website to flow from page to page, where and how I wanted to implement functionality and how I planned to style each page.

### Particular Challenges:

• The greatest challenge I had while writing the code for this project was designing a solid database that could handle all the requests necessary for this undertaking. I overcame this by designing my database in several ways: pen and paper diagrams, api route diagrams, and the [Database Schema](https://github.com/gitxandalf/alcove/wiki/Database-Schema). Having clean and clear code that represents these requests helps tremendously, as seen in the code below:

```

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
    comments = Comment.query.filter(Comment.image_id == id).all()
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
            album_id=form.data["album_id"],
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

        currentImage.name = form.data['name']
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


```


