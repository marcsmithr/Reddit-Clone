import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function PostCard({post}) {
    const user = post.user
    // console.log("POST.USER", user)
    const images = post.images
    // console.log("IMAGES[0]-----------", images[0])
    if(!post) return null
    return (
       <div className='post-card-container'>

            <div className='post-card-likes'>
            </div>
            <div className='post-card-main'>
                <div className='post-info-container'>
                    <div className='post-card-community-image-container'>
                        <img src={post.community_image} alt={`${post.community_name} community image`} />
                    </div>
                    <div className='post-card-community-header-container'>
                        <span className='post-card-community-header'>s/{post.community_name}</span>
                    </div>
                    <div className='post-card-user-container'>
                        <span>· posted by u/{user.username}</span>
                    </div>
                </div>
                <div className='post-title-container'>
                    <span> {post.title} </span>
                </div>
                {(images[0]) &&
                <div className='post-image-container'>
                    <img src={images[0].url}></img>
                </div>
                }
                {(post.text)&&
                <div className='post-card-text-container'>
                    <span>{post.text}</span>
                </div>
                }
                <div className='post-interaction-container'>
                    <div className='post-card-comment-container'>
                        <div className='post-card-comment-icon'>
                            <i className="fa-regular fa-comment"></i>
                        </div>
                        <div className='post-card-comment-text'>
                            <span>Comments</span>
                        </div>
                    </div>
                    <div className='post-card-save-container'>

                    </div>
                </div>
            </div>


        </div>

    )
}

export default PostCard
