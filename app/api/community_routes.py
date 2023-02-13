from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..forms import PostForm, CommunityForm
from ..models.db import db
from app.models import Community, Post


community_routes = Blueprint('community', __name__)

#GET ALL COMMUNITIES
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



#GETS ONE COMMUNITY
@community_routes.route('/<string:community_name>')
def get_one(community_name):
    '''Gets one community'''
    print ('COMM NAME IN BACKEND', community_name)
    community = Community.query.filter_by(name= community_name).first()
    print ('COMMUNITY IN BACKEND--------', community)
    community_to_dict = community.to_dict()
    print ('COMMUNITY to dict IN BACKEND--------', community_to_dict)
    if not community:
        return {"errors": "Subseddit not found"}, 404
    return {"Community": community_to_dict}


#CREATES POST FOR COMMUNITY
@community_routes.route('/<string:community_name>/posts', methods=['POST'])
@login_required
def new_form(community_name):
    '''
    Creates a post for a community
    '''
    print('COMMUNITY NAME', community_name)
    current_community = Community.query.filter_by(name= community_name).all()
    print('CURRENT COMMUNITY-------', current_community)
    community = current_community[0].to_dict()
    print('COMMUNITY-------', community['id'])
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('FORM DATA', form.data)
    print("HELLO FROM BACKEND--------------")

    if not current_community:
        return {"errors": "Community not found"}, 404

    if form.validate_on_submit():
        new_post = Post()
        form.populate_obj(new_post)
        new_post.user_id = current_user.id
        new_post.community_id = community['id']
        new_post.user = current_user
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201

    if form.errors:
        print("FORM ERRORS", form.errors)
        return {
             "errors": form.errors
        }, 400


#Creates a New Community
@community_routes.route('/new', methods=['POST'])
@login_required
def create_community():
    '''
    Creates a community
    '''
    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        new_community = Community()
        form.populate_obj(new_community)
        new_community.owner_id = current_user.id
        db.session.add(new_community)
        db.session.commit()
        return new_community.to_dict(), 201

    if form.errors:
        print("FORM ERRORS", form.errors)
        return {
             "errors": form.errors
        }, 400


#EDIT A COMMUNITY
@community_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_community_by_id(id):
    '''
    EDITS A COMMUNITY
    '''
    current_community = Community.query.get(id)

    if not current_community:
        return {"errors": "Community not found"}, 404

    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_community)
        db.session.add(current_community)
        db.session.commit()
        return current_community.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400

#DELETES A COMMUNITY
@community_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_item(id):
    '''
    DELETES A COMMUNITY
    '''
    community= Community.query.get(id)
    db.session.delete(community)
    db.session.commit()
    if not community:
        return {"errors": "Community not found"}, 404
    return {"message": "Community deleted"}
