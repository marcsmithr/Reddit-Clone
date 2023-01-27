from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, Post_Image
from ..models.db import db
from ..forms import PostImageForm

post_routes = Blueprint('post', __name__)

@post_routes.route('')
def all_posts():
    '''
    Queries for all of the posts in the database
    '''
    posts = Post.query.all()
    # print("POSTS IN BACKEND", posts)
    all_posts = []
    for post in posts:
        all_posts.append(post.to_dict())
        # print("Hi there")
        # print({"Reviews": all_reviews})
    # return {"Reviews": [review.to_dict() for review in reviews]}
    return {"Posts": all_posts}


@post_routes.route('/<int:id>/images', methods=["POST"])
@login_required
def post_image(id):
    '''
    Creates a post image to the post you are adding
    '''
    post = Post.query.get_or_404(id)

    if not post:
        return { "errors": "Post not found"}, 404

    form = PostImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_post_image = Post_Image()
        form.populate_obj(new_post_image)
        post.images.append(new_post_image)
        db.session.add(new_post_image)
        db.session.commit()

        return new_post_image.to_dict(), 200

    if form.errors:
        return {
            "errors": form.errors
        }, 400
