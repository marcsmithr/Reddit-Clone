from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .community import Community

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("communities.id")))
    title = db.Column(db.String(200), nullable=False)
    text = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    user = db.relationship('User', back_populates='post')
    images = db.relationship('Post_Image', back_populates='post', cascade='all, delete-orphan')
    likes = db.relationship('Post_Like', back_populates='post', cascade='all, delete-orphan')
    community = db.relationship('Community', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')
    def to_dict(self):
        """
            Returns a dict representing Post
            {
                id,
                user_id,
                community_id,
                community_name,
                community_image,
                title,
                text,
                images,
                created_at,
                updated_at
            }
        """

        post_community = Community.query.get(self.community_id)
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "community_id": self.community_id,
            "community_name": post_community.name,
            "community_image": post_community.community_image,
            "title": self.title,
            "text": self.text,
            "images": [image.to_dict() for image in self.images],
            "likes": [like.to_dict() for like in self.likes],
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def to_dict_no_user(self):
        """
            Returns a dict representing Post
            {
                id,
                user_id,
                community_id,
                community_name,
                community_image,
                title,
                text,
                images,
                created_at,
                updated_at
            }
        """

        post_community = Community.query.get(self.community_id)
        return {
            "id": self.id,
            "community_id": self.community_id,
            "community_name": post_community.name,
            "community_image": post_community.community_image,
            "title": self.title,
            "text": self.text,
            "images": [image.to_dict() for image in self.images],
            "likes": [like.to_dict() for like in self.likes],
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }


class Post_Image(db.Model):
    __tablename__ = 'post_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
    url = db.Column(db.String(500), nullable=False)

    post = relationship('Post', back_populates='images')

    def to_dict(self):
        """
        Returns a dict representing Post Image
        {
            id,
            post_id,
            url
        }
        """
        return {
            "id": self.id,
            "post_id": self.post_id,
            "url": self.url,
        }

class Post_Like(db.Model):
    __tablename__ = 'post_likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    is_like = db.Column(db.Boolean, nullable=False)

    post = relationship('Post', back_populates='likes')
    user = relationship('User', back_populates='likes')

    def to_dict(self):
        """
        Returns a dict representing Post Image
        {
            id,
            post_id,
            user_id,
            is_like
        }
        """
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user_id,
            "is_like": self.is_like
        }
