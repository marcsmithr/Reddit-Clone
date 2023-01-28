import React, {useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOnePost } from '../../../store/posts'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'

function SinglePostPage() {
    const dispatch = useDispatch()
    const { post_id } = useParams()
    console.log('ASDFFFFF', post_id)

    useEffect(()=> {
        dispatch(getOnePost(post_id))
    }, [dispatch])

    const post= useSelector((state)=> state.posts.singlePost)
    console.log("POST IN SINGLE POST", post)
    const user = post.user
    const images = post.images


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

export default SinglePostPage
