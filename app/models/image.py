from .db import db


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    album_id = db.Column(db.Integer, db.ForeignKey("albums.id"))
    image_url = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user = db.relationship(
        "User", back_populates="image")
    album = db.relationship(
        "Album", back_populates="image")
    comment = db.relationship(
        "Comment", back_populates="image", cascade="delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'album_id': self.album_id,
            'image_url': self.image_url,
            'name': self.name,
            'description': self.description
        }
