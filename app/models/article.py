from .db import db


class Article(db.Model):
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    image_url = db.Column(db.String(255), nullable=True)
    title = db.Column(db.String(50), nullable=False)
    article_content = db.Column(db.Text, nullable=False)
    user = db.relationship(
        "User", back_populates="article")
    comment = db.relationship(
        "Comment", back_populates="article", cascade="delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_url': self.image_url,
            'title': self.title,
            'article_content': self.article_content
        }
