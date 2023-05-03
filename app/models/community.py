from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Community(db.Model):
    __tablename__ = 'communities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    community_image = db.Column(db.String(1000), default="https://i.ibb.co/qxFYBgf/subseddit-icon.png")
    community_banner = db.Column(db.String(1000), default="https://i.redd.it/sgf6r5easbh31.jpg")
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    user = db.relationship('User', back_populates='community')
    posts = db.relationship('Post', back_populates='community', cascade='all, delete-orphan')

    def to_dict(self):
        """
        Returns a dict representing Business
        {
            id,
            owner_id,
            name,
            title,
            description,
            community_image,
            community_banner,
        }
        """
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "title": self.title,
            "description": self.description,
            "community_image": self.community_image,
            "community_banner": self.community_banner
        }
