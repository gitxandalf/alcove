from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    article_id = db.Column(db.Integer, db.ForeignKey("articles.id"))
    image_id = db.Column(db.Integer, db.ForeignKey("images.id"))
    comment_content = db.Column(db.Text, nullable=False)
    user = db.relationship(
        "User", back_populates="comment")
    article = db.relationship(
        "Article", back_populates="comment")
    image = db.relationship(
        "Image", back_populates="comment")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'article_id': self.article_id,
            'image_id': self.image_id,
            'comment_content': self.comment_content,
        }
