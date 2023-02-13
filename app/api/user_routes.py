from flask import Blueprint, jsonify
from flask_login import login_required
from ..models.db import db
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict_info() for user in users]}


@user_routes.route('/<string:username>')
@login_required
def user(username):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.filter_by(username= username).first()
    return user.to_dict_info()

@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    '''
    DELETE A USER BY ID
    '''
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    if not user:
        return {"errors": "User not found"}, 404
    return {"message": "User deleted"}
