from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, Post_Image, Post_Like
from ..models.db import db
from ..forms import PostLikeForm, PostForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('post', __name__)

#GET ALL POSTS
@post_routes.route('')
def all_posts():
    '''
    Queries for all of the posts in the database
    '''
    posts = Post.query.all()
    print("POSTS IN BACKEND", posts)
    all_posts = []
    for post in posts:
        all_posts.append(post.to_dict())
        print("Hi there")
    return {"Posts": all_posts}


#GET ONE POST
@post_routes.route('/<int:id>')
def one_post(id):
    '''
    Gets one post
    '''
    post = Post.query.get(id)

    post_to_dict = post.to_dict()
    if not post:
        return {"errors": "Post not found"}, 404

    return {"Post": post_to_dict}




#DELETE POST
@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_item(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    if not post:
        return {"errors": "Post not found"}, 404
    return {"message": "post deleted"}


# UPDATE POST
@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_post_by_id(id):
    current_post = Post.query.get(id)
    if not current_post:
        return {"errors": "Post not found"}, 404

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_post)

        db.session.add(current_post)
        db.session.commit()
        return current_post.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400


#CREATE IMAGE
@post_routes.route('/<int:id>/images', methods=["POST"])
@login_required
def post_image(id):
    '''
    Creates a post image to the post you are adding
    '''
    post = Post.query.get_or_404(id)

    print("REQUEST IN BACKEND", request)

    if not post:
        return { "errors": "Post not found"}, 404

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)
    print ("IMAGE----------------", image)
    upload = upload_file_to_s3(image)
    print("UPLOAD-----------------", upload)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400


    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Post_Image(post_id=id, url=url)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}

# UPDATE POST IMAGE
@post_routes.route('/images/<int:id>', methods=['PUT'])
@login_required
def update_image_by_id(id):
    current_image = Post_Image.query.get(id)

    if not current_image:
        return {"errors": "Image not found"}, 404

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)


    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400


    url = upload["url"]

    if url:
        current_image.url = url
        db.session.commit()
        return current_image.to_dict(), 201

    else:
        return {
            "errors": upload
        }, 400


#DELETE POSTIMAGE
@post_routes.route('/images/<int:id>', methods=['DELETE'])
@login_required
def delete_image(id):

    image = Post_Image.query.get(id)
    if not image:
        return {"errors": "Image not found"}, 404
    post_id = image.post_id
    db.session.delete(image)
    db.session.commit()
    return {"message": "Image deleted",
            "post_id": post_id
            }


#GET ALL LIKES FOR POST
@post_routes.route('<int:id>/likes')
def all_likes_for_post(id):
    '''
    Queries for all of the likes for a single post
    '''
    print("ID IN BACKEND-----------", id)
    likes = Post_Like.query.filter_by(post_id=id).all()
    print("LIKES IN BACKEND------", likes)
    all_likes = []
    for like in likes:
        all_likes.append(like.to_dict())
    print("ALL LIKES SET---------", all_likes)
    return {"likes": all_likes}


#CREATE POSTLIKE
@post_routes.route('<int:id>/likes', methods=['POST'])
@login_required
def new_like(id):
    '''
    Creates a like for a post
    '''
    print("request----------------", request)

    form = PostLikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        new_like = Post_Like()
        form.populate_obj(new_like)
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict(), 201

    if form.errors:
        print("FORM ERRORS", form.errors)
        return {
             "errors": form.errors
        }, 400



# UPDATE Like
@post_routes.route('/<int:post_id>/likes/<int:like_id>', methods=['PUT'])
@login_required
def update_like_by_id(post_id, like_id):
    current_like = Post_Like.query.get(like_id)
    if not current_like:
        return {"errors": "Like not found"}, 404

    form = PostLikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_like)

        db.session.add(current_like)
        db.session.commit()
        return current_like.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400

#DELETES A LIKE
@post_routes.route('/<int:post_id>/likes/<int:like_id>/delete', methods=['DELETE'])
@login_required
def delete_like(post_id, like_id):
    '''
    DELETES A LIKE
    '''
    like= Post_Like.query.get(like_id)
    if not like:
        return {"errors": "Like not found"}, 404
    db.session.delete(like)
    db.session.commit()
    return {"message": "Like deleted"}
