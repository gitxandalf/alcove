from .db import db


class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.relationship(
        "Image", back_populates="album")
    user = db.relationship(
        "User", back_populates="album")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
        }
