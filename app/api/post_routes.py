from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post
from ..forms import PostForm

post_routes = Blueprint('post', __name__)

@post_routes.route('')
def all_posts():
    '''
    Queries for the all of the reviews in the database
    '''
    posts = Post.query.all()
    all_posts = []
    for post in posts:
        # print(review.to_dict())
        all_posts.append(posts.to_dict())
        # print("Hi there")
        # print({"Reviews": all_reviews})
    # return {"Reviews": [review.to_dict() for review in reviews]}
    return {"Posts": all_posts}
