import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function evaluateLikes (arr){
    let likes = []
    let dislikes = []
    arr.forEach(el => {
        if(el.is_like) likes.push(el)
        else dislikes.push(el)
    });
    console.log(arr)
    console.log(likes)
    console.log(dislikes)
    return (likes.length - dislikes.length)
}

function PostCard({post}) {
    const user = post.user
    const likes = evaluateLikes(post.likes)

    const images = post.images
    if(!post||!user) return null
    return (
        <>
            <Link className='post-card-link' to={`/s/${post.community_name}/${post.id}/comments`}>
                <div className='post-card-container'>
                        <div className='post-card-likes'>
                            <span>{likes}</span>
                        </div>
                        <div className='post-card-main'>
                            <div className='post-info-container'>
                                <div className='post-card-community-image-container'>
                                    <img src={post.community_image} alt={`${post.community_name} community image`} />
                                </div>
                                <div className='post-card-community-header-container'>
                                <Link className='post-card-link' to={`/s/${post.community_name}`}>
                                    <span className='post-card-community-header'>s/{post.community_name}</span>
                                </Link>
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
                                {/* <div className='post-card-comment-container'>
                                    <div className='post-card-comment-icon'>
                                        <i className="fa-regular fa-comment"></i>
                                    </div>
                                    <div className='post-card-comment-text'>
                                        <span>Comments</span>
                                    </div>
                                </div> */}
                                <div className='post-card-save-container'>

                                </div>
                            </div>
                        </div>
                </div>
            </Link>
        </>
    )
}

export default PostCard
