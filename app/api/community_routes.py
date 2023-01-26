from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Community


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
