from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, Post_Image
from ..models.db import db
from ..forms import PostImageForm, PostForm
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
        # print({"Reviews": all_reviews})
    # return {"Reviews": [review.to_dict() for review in reviews]}
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

    # form = PostImageForm()

    # form['csrf_token'].data = request.cookies['csrf_token']

    # if form.validate_on_submit():
    #     new_post_image = Post_Image()
    #     form.populate_obj(new_post_image)
    #     post.images.append(new_post_image)
    #     db.session.add(new_post_image)
    #     db.session.commit()

    #     return new_post_image.to_dict(), 200

    # if form.errors:
    #     return {
    #         "errors": form.errors
    #     }, 400

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


# UPDATE POST IMAGE
@post_routes.route('/images/<int:id>', methods=['PUT'])
@login_required
def update_image_by_id(id):
    current_image = Post_Image.query.get(id)
    print ('HELLO FROM BACKEND UPDATE IMAGE--------')
    if not current_image:
        return {"errors": "Image not found"}, 404

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
    print("DID WE HIT THE DELETE ROUTE?---------YES")
    image = Post_Image.query.get(id)
    print("IMAGE IN THE BACKEND---------", image)
    print("IMAGE IN THE BACKEND---------", image.to_dict())
    if not image:
        return {"errors": "Image not found"}, 404
    post_id = image.post_id
    db.session.delete(image)
    db.session.commit()
    return {"message": "Image deleted",
            "post_id": post_id
            }
