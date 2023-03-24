import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadAllLikes } from '../../../store/likes'
import { createLike, deleteLike, updateLike } from '../../../store/posts'
import './index.css'

function evaluateLikes (arr){
    let likes = []
    let dislikes = []
    arr.forEach(el => {
        if(el.is_like) likes.push(el)
        else dislikes.push(el)
    });
    return (likes.length - dislikes.length)
}

function checkHasVoted(arr, id=null){
    if(arr && arr.length>0){
        for (let like of arr){
            if(like.user_id == id){
                return like
        }}
    }
    return false
}

function PostCard({post}) {
    const dispatch = useDispatch()

    const [upvote, setUpvote] = useState(false)
    const [downvote, setDownvote] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)
    const [usersLikeId, setUsersLikeId]= useState(0)
    const user = post.user
    let likes = []
    if(post.likes){

        likes = evaluateLikes(post.likes)
    }

    const currentUser = useSelector(state => state.session.user)



    const images = post.images

    const upvoted = ()=>{
        console.log("hasvoted?", hasVoted)
        console.log("userLikeId", usersLikeId)
        if(!upvote&&!hasVoted){

            setDownvote(false)
            setUpvote(true)
            let payload = {
                post_id: post.id,
                user_id: currentUser.id,
                is_like: true
            }
            console.log("create payload", payload)
            const like = dispatch(createLike(payload,post))
            setUsersLikeId(like.id)

        }

        else if(!upvote&&hasVoted){

            let payload = {
                post_id: post.id,
                user_id: currentUser.id,
                is_like: true
            }
            const like = dispatch(updateLike(payload, usersLikeId, post, currentUser.id))
            setUsersLikeId(like.id)

        } else {

            setDownvote(false)
            setUpvote(false)
            dispatch(deleteLike(usersLikeId, post, currentUser.id))
            setHasVoted(false)
            setUsersLikeId(0)

        }
    }
    const downvoted = ()=>{
        console.log("hasvoted?", hasVoted)
        console.log("userLikeId", usersLikeId)
        if(!downvote&&!hasVoted){

        setUpvote(false)
        setDownvote(true)
        let payload = {
            post_id: post.id,
            user_id: currentUser.id,
            is_like: false
        }
        const like = dispatch(createLike(payload, post))
        setUsersLikeId(like.id)

        } else if(!downvote&&hasVoted){

            setUpvote(false)
            setDownvote(true)
            let payload = {
                post_id: post.id,
                user_id: currentUser.id,
                is_like: false
            }
            const like = dispatch(updateLike(payload, usersLikeId, post, currentUser.id))
            setUsersLikeId(like.id)

        } else {
            setUpvote(false)
            setDownvote(false)
            dispatch(deleteLike(usersLikeId, post, currentUser.id))
            setHasVoted(false)
            setUsersLikeId(0)
        }
    }


    useEffect(()=>{
        if(currentUser&&post.likes){
            let vote = checkHasVoted(post.likes, currentUser.id)
            if(vote){
                setHasVoted(true)
                setUsersLikeId(vote.id)
                if(vote.is_like){
                    setUpvote(true)
                    setDownvote(false)
                } else {
                    setUpvote(false)
                    setDownvote(true)
                }
            }
        }
    }, [post, upvote])

    const upvoteId = upvote? "voted" : ""
    const downvoteId = downvote? "voted" : ""

    if(!post||!user) return null
    return (
        <>
                <div className='post-card-container'>
                        <div className='post-card-likes'>
                            <button className='vote-button' onClick={upvoted}>
                                <i className="fa-solid fa-chevron-up vote" id={upvoteId}></i>
                            </button>
                            <span>{likes}</span>
                            <button className='vote-button' onClick={downvoted}>
                                <i className="fa-solid fa-chevron-down vote" id={downvoteId}></i>
                            </button>
                        </div>
                    <Link className='post-card-link' to={`/s/${post.community_name}/${post.id}/comments`}>
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
                    </Link>
                </div>
        </>
    )
}

export default PostCard
