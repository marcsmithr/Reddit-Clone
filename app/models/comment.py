from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), default = 13)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("comments.id")))
    text = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    user = db.relationship('User', back_populates='comment')
    post = db.relationship('Post', back_populates='comments')
    parent= db.relationship('Comment', remote_side=[id])

    def to_dict(self):
        """
            Returns a dict representing Comment
            {
                id,
                user_id,
                post_id,
                parent_id,
                text,
                created_at,
                updated_at
            }
        """
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "post_id": self.post_id,
            "parent_id": self.parent_id,
            "text": self.text,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
