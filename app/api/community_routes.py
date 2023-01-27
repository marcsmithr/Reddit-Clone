from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..forms import PostForm
from ..models.db import db
from app.models import Community, Post


community_routes = Blueprint('community', __name__)


@community_routes.route('')
def all_communities():
    '''
    Queries for all of the communities
    '''
    communities = Community.query.all()
    all_communities = []
    for community in communities:
        all_communities.append(community.to_dict())

    return{"Communities": all_communities}



@community_routes.route('/<int:community_name>')
def get_one(community_name):
    community = Community.query.get(community_name)
    community_to_dict = community.to_dict()
    if not community:
        return {"errors": "Subseddit not found"}, 404
    return {"Community": community_to_dict}


@community_routes.route('/<int:id>/posts', methods=['POST'])
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
