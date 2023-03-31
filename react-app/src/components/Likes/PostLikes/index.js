import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allPosts, createLike, deleteLike, getOnePost, updateLike } from '../../../store/posts'
import './index.css'

//function which returns the amount of likes minus dislikes
function evaluateLikes (arr){
    let likes = []
    let dislikes = []
    arr.forEach(el => {
        if(el.is_like) likes.push(el)
        else dislikes.push(el)
    });
    return (likes.length - dislikes.length)
}
//function which checks if the current user has voted on post before
function checkHasVoted(arr, id=null){
    //loops through post.likes array and compares current user's id to all like user_ids
    if(arr && arr.length>0){
        for (let like of arr){
            if(like.user_id == id){
                return like
        }}
    }
    return false
}

function PostLikes ({post}){
    const dispatch = useDispatch()

    const [upvote, setUpvote] = useState(false)
    const [downvote, setDownvote] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)
    const [usersLikeId, setUsersLikeId]= useState(0)
    const [isLoading, setIsLoading]= useState(false)
    const [likes, setLikes] = useState(0)
    const user = post.user
    const currentUser = useSelector(state => state.session.user)

    // a function linked to upvote button which handles like CRUD
    const upvoted = ()=>{
        //setIsLoading to avoid having overlapping like fetches
        setIsLoading(true)
        //checks that the upvote button is not active and the user has not voted on this post before
        if(!upvote&&!hasVoted){
            //this "if" statement initiates the creation of a new like
            setDownvote(false)
            setUpvote(true)
            //create a like with a is_like set to true, designating that it is an upvote
            let payload = {
                post_id: post.id,
                user_id: currentUser.id,
                is_like: true
            }
            //create the like
            const like = dispatch(createLike(payload, post))
            //set userLikeId which can later be passed into put and delete requests
            setUsersLikeId(like.id)
            //increment likes
            // setLikes(prev=>prev+1)
            //dispatch allPosts to rerender page NOT IDEAL REFACTOR
            dispatch(allPosts())
            // dispatch(getOnePost(post.id))
            .then(()=> setIsLoading(false))
        }
        //checks that the upvote button is not active and the user HAS voted on this post before
        else if(!upvote&&hasVoted){
            //this "if" statement initiates the update of an existing like
            setDownvote(false)
            setUpvote(true)
            //update existing like with a is_like set to true, designating that it is an upvote
            let payload = {
                post_id: post.id,
                user_id: currentUser.id,
                is_like: true
            }
            //update the like
            const like = dispatch(updateLike(payload, usersLikeId, post, currentUser.id))
            //set userLikeId which can later be passed into put and delete requests PROBABLY UNNESSESSARY
            setUsersLikeId(like.id)
            //dispatch allPosts to rerender page NOT IDEAL REFACTOR
            dispatch(allPosts())
            // dispatch(getOnePost(post.id))
            .then(()=> setIsLoading(false))
            //if upvote button IS active and the user HAS voted on this post before delete like
        } else {
            dispatch(deleteLike(usersLikeId, post, currentUser.id))
            .then(()=>setUpvote(false))
            .then(()=>setDownvote(false))
            .then(()=>setHasVoted(false))
            .then(()=>setUsersLikeId(0))
            .then(()=> setIsLoading(false))
            dispatch(allPosts())
            // dispatch(getOnePost(post.id))
        }
    }

    // a function linked to upvote button which handles like CRUD
    //a mirror of upvote
    const downvoted = ()=>{
        setIsLoading(true)
        if(!downvote&&!hasVoted){
            console.log("creating")
            setUpvote(false)
            setDownvote(true)
            let payload = {
                post_id: post.id,
                user_id: currentUser.id,
                is_like: false
            }
            const like = dispatch(createLike(payload, post))
            setUsersLikeId(like.id)
            dispatch(allPosts())
            // dispatch(getOnePost(post.id))
            .then(()=> setIsLoading(false))

        } else if(!downvote&&hasVoted){

            console.log("editing")
            setUpvote(false)
            setDownvote(true)
            let payload = {
                post_id: post.id,
                user_id: currentUser.id,
                is_like: false
            }
            const like = dispatch(updateLike(payload, usersLikeId, post, currentUser.id))
            setUsersLikeId(like.id)
            dispatch(allPosts())
            // dispatch(getOnePost(post.id))
            .then(()=> setIsLoading(false))

        } else {
            console.log("deleting")
            dispatch(deleteLike(usersLikeId, post, currentUser.id))
            .then(()=>setUpvote(false))
            .then(()=>setDownvote(false))
            .then(()=>setHasVoted(false))
            .then(()=>setUsersLikeId(0))
            .then(()=> setIsLoading(false))
            // dispatch(getOnePost(post.id))
            dispatch(allPosts())
        }
    }

    //checks if user has voted on post before
    //if yes set hasVoted, userLikeId, upvote, and downvote appropriately
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
    }, [post, upvote, downvote])

    //sets the aggrigate value of like vs dislikes
    useEffect(()=>{
        if (post.likes){
            setLikes(evaluateLikes(post.likes))
        }
    }, [post])

    //dynamically sets the css on the upvote and downvote arrow
    const upvoteId = upvote? "voted" : ""
    const downvoteId = downvote? "voted" : ""
    //disables buttons while a fetch is in progress
    const isDisabled = isLoading? "disabled": ""

    if(!post||!user) return null
    return(
        <>
            <button className='vote-button' onClick={upvoted} disabled={isDisabled}>
                <i className="fa-solid fa-chevron-up vote" id={upvoteId}></i>
            </button>
            <span>{likes}</span>
            <button className='vote-button' onClick={downvoted} disabled={isDisabled}>
                <i className="fa-solid fa-chevron-down vote" id={downvoteId}></i>
            </button>
        </>
    )
}

export default PostLikes
