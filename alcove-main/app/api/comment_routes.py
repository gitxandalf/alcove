
from turtle import title
from flask import Blueprint, request
from flask_login import login_required
from app.models import Comment, User, db
from app.forms import AddCommentForm, EditCommentForm
from sqlalchemy import asc


comment_routes = Blueprint(
    'comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET ALL COMMENTS


@comment_routes.route('/')
def comments():
    # GET Route for all comments
    users = User.query.all()
    comments = Comment.query.order_by(Comment.id.asc()).all()
    return {'comments': [comment.to_dict() for comment in comments], 'users': [user.to_dict() for user in users]}

# POST A COMMENT


@comment_routes.route('/add-comment', methods=['POST'])
@login_required
def post_comment():
    data = request.json
    form = AddCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            user_id=data["user_id"],
            article_id=data["article_id"],
            image_id=data["image_id"],
            comment_content=form.data['comment_content'],
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# EDIT A COMMENT


@comment_routes.route('/<int:commentId>/edit-comment', methods=['PUT'])
@login_required
def edit_comment(commentId):
    data = request.json
    form = EditCommentFrom()

    form['csrf_token'].data = request.cookies['csrf_token']

    currentComment = Review.query.get(commentId)

    if form.validate_on_submit() and currentComment:

        currentComment.user_id = data["user_id"]
        currentComment.article_id = data["article_id"]
        currentComment.image_id = data["image_id"]
        currentComment.comment_content = form.data['comment_content']

        db.session.commit()
        return currentComment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE A COMMENT


@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    currentComment = Comment.query.get(id)

    db.session.delete(currentComment)
    db.session.commit()
    return {}
