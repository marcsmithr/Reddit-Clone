from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post
from ..models.db import db
from ..forms import PostForm

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


@post_routes.route('/new', methods=['POST'])
@login_required
def new_form():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_post = Post()
        form.populate_obj(new_post)
        new_post.owner_id = current_user.id
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201

    if form.errors:
        return {
             "errors": form.errors
        }, 400
