from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment
from ..models.db import db
from ..forms import CommentForm

comment_routes = Blueprint('comment', __name__)

#GET ALL COMMENTS FOR POST
@comment_routes.route('/post/<int:id>')
def all_comments_for_post(id):
    '''
    Queries for all of the comments for a single post
    '''
    comments = Comment.query.filter_by(post_id= id).all()
    print("COMMENTS IN BACKEND", comments)
    all_comments = []
    for comment in comments:
        all_comments.append(comment.to_dict())
    return {"Comments": all_comments}
