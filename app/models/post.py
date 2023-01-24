from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("community.id")))
    title = db.Column(db.String(200), nullable=False)
    text = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    user = db.relationship('User', back_populates='post')


    def to_dict(self):
        """
            Returns a dict representing Post
            {
                id,
                user_id,
                community_id,
                title,
                text,
                created_at,
                updated_at
            }
        """
        return {
            "id": self.id,
            "user": self.user.to_dict_info(),
            "community_id": self.community_id,
            "title": self.title,
            "text": self.text,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
