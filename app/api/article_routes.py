from flask import Blueprint, request
from flask_login import login_required
from app.models import Article, User, Comment, db
from app.forms import AddArticleForm, EditArticleForm


article_routes = Blueprint(
    'articles', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@article_routes.route('/')
def articles():
    # GET Route for all articles
    # At top of profile page, should be a NavLink to Articles (page listing each article)
    # Once NavLink for a certain Article is clicked, user would be routed to /articles/:articleId
    articles = Article.query.order_by(Article.id).all()
    users = User.query.all()
    return {'articles': [article.to_dict() for article in articles], 'users': [user.to_dict() for user in users]}


@article_routes.route('/<int:id>')
def article(id):
    # GET Route for all data for a specified article
    article = Article.query.get(id)
    users = User.query.all()
    return {'article': article.to_dict(), 'users': [user.to_dict() for user in users]}


@article_routes.route('/add-article', methods=['POST'])
@login_required
def post_article():
    data = request.json
    form = AddArticleForm()
    print("FORM DATA________>", form.data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        article = Article(
            user_id=data["user_id"],
            image_url=form.data['image_url'],
            title=form.data['title'],
            article_content=form.data['article_content']
        )
        db.session.add(article)
        db.session.commit()
        return article.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@article_routes.route('/<int:articleId>/edit-article', methods=['PUT'])
@login_required
def edit_article(articleId):
    data = request.json
    form = EditArticleForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    currentArticle = Article.query.get(articleId)

    if form.validate_on_submit() and currentArticle:

        currentArticle.image_url = form.data['image_url']
        currentArticle.title = form.data['title']
        currentArticle.article_content = form.data['article_content']

        db.session.commit()
        return currentArticle.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@article_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_article(id):
    currentArticle = Article.query.get(id)
    db.session.delete(currentArticle)
    db.session.commit()
    return "Delete Successful"
