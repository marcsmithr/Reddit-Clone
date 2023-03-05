from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, Post
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

# CREATES A NEW COMMENT ON A POST
@comment_routes.route('/posts/<int:post_id>/comment/<int:parent_id>', methods=['POST'])
@login_required
def new_comment(post_id, parent_id):
    '''
    Create a new comment on a post
    '''
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment()
        form.populate_obj(new_comment)
        new_comment.user_id = current_user.id
        new_comment.post_id = post_id
        if(parent_id):
            new_comment.parent_id = parent_id
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(), 201

    if form.errors:
        return{
            "errors": form.errors
        }, 400


# UPDATE COMMENT
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment_by_id(id):
    current_comment = Comment.query.get(id)
    if not current_comment:
        return {"errors": "Comment not found"}, 404

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_comment)

        db.session.add(current_comment)
        db.session.commit()
        return current_comment.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400
