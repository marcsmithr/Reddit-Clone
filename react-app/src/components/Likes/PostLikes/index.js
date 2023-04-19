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
    const [usersLikeId, setUsersLikeId]= useState(0)
    const [isLoading, setIsLoading]= useState(false)
    const [userLike, setUserlike] = useState(0)

    const [voteId, setVoteId] = useState(["", ""])
    const [likes, setLikes] = useState(()=>{
        return evaluateLikes(post.likes)
    })

    const user = post.user
    const currentUser = useSelector(state => state.session.user)
    //checks if user has voted on post before
    //if yes set hasVoted, userLikeId, upvote, and downvote appropriately

    //disables buttons while a fetch is in progress
    const isDisabled = isLoading? "disabled": ""


    const sortLike =(str)=>{
        switch(str){
            case "0 up":
                case "-1 up":
                    setUserlike(1)
                break
            case "0 down":
                case "1 down":
                setUserlike(-1)
                break
                case "1 up":
                    case "-1 down":
                        setUserlike(0)
                        break
            default:
            }
    }

    async function handleLikeCrud (str){
        setIsLoading(true)
        let payload = {
            post_id: post.id,
            user_id: currentUser.id,
            is_like: true
        }
        let method = "POST"
        switch(str){
            case "0 up":
                case "0 down":
                    payload.is_like = (str.includes("up"))? true : false
                    break
                    case "1 up":
            case "-1 down":
                method = "DELETE"
                break
                case "1 down":
                    case "-1 up":
                        payload.is_like = (str.includes("up"))? true : false
                method = "PUT"
                break
            }
            if(method=="DELETE"){
            await dispatch(deleteLike(usersLikeId, post, currentUser.id))
            setIsLoading(false)
        } else if (method=="PUT"){
            let like = await dispatch(updateLike(payload, usersLikeId, post, currentUser.id))
            setUsersLikeId(like.id)
            setIsLoading(false)
        } else {
            let like = await dispatch(createLike(payload, post))
            setUsersLikeId(like.id)
            setIsLoading(false)
        }
    }

    const handleUpvote = ()=>{
        sortLike(`${userLike} up`)
        handleLikeCrud(`${userLike} up`)

    }

    const handleDownvote = ()=>{
        sortLike(`${userLike} down`)
        handleLikeCrud(`${userLike} down`)
    }

    useEffect(()=>{
        if(currentUser&&post.likes){
            let vote = checkHasVoted(post.likes, currentUser.id)
            if(vote){
                setUsersLikeId(vote.id)
                if(vote.is_like){
                    setUserlike(1)
                    setLikes((prev)=>(prev-1))
                } else {
                    setUserlike(-1)
                    setLikes((prev)=>(prev+1))
                }
            }
        }
    }, [])

    useEffect(()=>{
        if(userLike===0){
            setVoteId(["", ""])
        } else if (userLike===1){
            setVoteId(["voted", ""])
        } else {
            setVoteId(["", "voted"])
        }
    }, [userLike])

    if(!post||!user) return null
    return(
        <>
            <button className='vote-button' onClick={handleUpvote} >
                <i className="fa-solid fa-chevron-up vote" id={voteId[0]}></i>
            </button>
            <span>{likes + userLike}</span>
            <button className='vote-button' onClick={handleDownvote} >
                <i className="fa-solid fa-chevron-down vote" id={voteId[1]}></i>
            </button>
        </>
    )
}

export default PostLikes
