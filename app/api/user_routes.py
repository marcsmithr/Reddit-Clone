from flask import Blueprint, jsonify, request
from flask_login import login_required
from ..models.db import db
from app.models import User
from ..forms.signup_form import SignUpForm

user_routes = Blueprint('users', __name__)

#GET ALL USERS
@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict_info() for user in users]}

#GET ONE USER
@user_routes.route('/<string:username>')
@login_required
def user(username):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.filter_by(username= username).first()
    return user.to_dict_info()

#DELETE A USER
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

#EDIT A USER
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user_by_id(id):
    '''
    EDITS A User
    '''
    current_user = User.query.get(id)

    if not current_user:
        return {"errors": "User not found"}, 404

    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_user)
        db.session.add(current_user)
        db.session.commit()
        return current_user.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400
