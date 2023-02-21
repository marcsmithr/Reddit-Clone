from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("comments.id")), nullable=False)
    text = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    # user = db.relationship('User', back_populates='community')
    # posts = db.relationship('Post', back_populates='community', cascade='all, delete-orphan')

    # def to_dict(self):
    #     """
    #     Returns a dict representing Business
    #     {
    #         id,
    #         owner_id,
    #         name,
    #         title,
    #         description,
    #         community_image,
    #         community_banner,
    #     }
    #     """
    #     return {
    #         "id": self.id,
    #         "owner_id": self.owner_id,
    #         "name": self.name,
    #         "title": self.title,
    #         "description": self.description,
    #         "community_image": self.community_image,
    #         "community_banner": self.community_banner
    #     }
