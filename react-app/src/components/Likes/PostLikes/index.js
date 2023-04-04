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
    const [likes, setLikes] = useState(()=>{
        return evaluateLikes(post.likes)
    })

    const user = post.user
    const currentUser = useSelector(state => state.session.user)

    // a function linked to upvote button which handles like CRUD
    const upvoted = ()=>{
        //setIsLoading to avoid having overlapping like fetches
        setIsLoading(true)
        //checks that the upvote button is not active and the user has not voted on this post before
        if(!upvote&&!hasVoted){
            //this "if" statement initiates the creation of a new like
            //create a like with a is_like set to true, designating that it is an upvote
            let payload = {
                post_id: post.id,
                user_id: currentUser.id,
                is_like: true
            }
            //create the like
            const like = dispatch(createLike(payload, post))
            //set userLikeId which can later be passed into put and delete requests
            .then(()=>setUsersLikeId(like.id))
            //increment likes
            .then(()=>setLikes(prev=> prev+=1))
            //set upvote and downvote state
            .then(()=>setDownvote(false))
            .then(()=>setUpvote(true))
            //dispatch allPosts to rerender page NOT IDEAL REFACTOR
            .then(()=>dispatch(allPosts()))
            // dispatch(getOnePost(post.id))
            .then(()=> setIsLoading(false))
            console.log("upvoted create", upvote)
        }
        //checks that the upvote button is not active and the user HAS voted on this post before
        else if(!upvote&&hasVoted){
            //this "if" statement initiates the update of an existing like
            //update existing like with a is_like set to true, designating that it is an upvote
            let payload = {
                post_id: post.id,
                user_id: currentUser.id,
                is_like: true
            }
            //update the like
            const like = dispatch(updateLike(payload, usersLikeId, post, currentUser.id))
            //set userLikeId which can later be passed into put and delete requests PROBABLY UNNESSESSARY
            .then(()=>setUsersLikeId(like.id))
            //increment likes
            .then(()=>setLikes(prev=> prev+=2))
            //set upvote and downvote state
            .then(()=>setDownvote(false))
            .then(()=>setUpvote(true))
            //dispatch allPosts to rerender page NOT IDEAL REFACTOR
            .then(()=>dispatch(allPosts()))
            .then(()=>setIsLoading(false))
            .then(()=>console.log("upvoted update-expect true", upvote))
            //if upvote button IS active and the user HAS voted on this post before delete like
        } else {
            dispatch(deleteLike(usersLikeId, post, currentUser.id))
            .then(()=>setUpvote(false))
            .then(()=>setDownvote(false))
            .then(()=>setHasVoted(false))
            .then(()=>setUsersLikeId(0))
            .then(()=> setIsLoading(false))
            .then(()=> setLikes(prev => prev-=1))
            .then(()=>dispatch(allPosts()))
            // dispatch(getOnePost(post.id))
        }
    }

    // a function linked to upvote button which handles like CRUD
    //a mirror of upvote
    const downvoted = ()=>{
        setIsLoading(true)
        if(!downvote&&!hasVoted){
            let payload = {
                post_id: post.id,
                user_id: currentUser.id,
                is_like: false
            }

            const like = dispatch(createLike(payload, post))
            .then(()=>setUsersLikeId(like.id))
            .then(()=>setLikes(prev=> prev-=1))
            .then(()=>setUpvote(false))
            .then(()=>setDownvote(true))
            .then(()=>dispatch(allPosts()))
            .then(()=>setIsLoading(false))

        } else if(!downvote&&hasVoted){
            let payload = {
                post_id: post.id,
                user_id: currentUser.id,
                is_like: false
            }

            const like = dispatch(updateLike(payload, usersLikeId, post, currentUser.id))
            .then(()=>setUsersLikeId(like.id))
            .then(()=>setLikes(prev=> prev-=2))
            .then(()=>setUpvote(false))
            .then(()=>setDownvote(true))
            .then(()=>dispatch(allPosts()))
            .then(()=>setIsLoading(false))
            console.log("downvoted update", downvote)

        } else {
            dispatch(deleteLike(usersLikeId, post, currentUser.id))
            .then(()=> setLikes(prev => prev+=1))
            .then(()=>setDownvote(false))
            .then(()=>setHasVoted(false))
            .then(()=>setUsersLikeId(0))
            .then(()=> setIsLoading(false))
            .then(()=>dispatch(allPosts()))
        }
    }

    //checks if user has voted on post before
    //if yes set hasVoted, userLikeId, upvote, and downvote appropriately
    useEffect(()=>{
        if(currentUser&&post.likes){
            let vote = checkHasVoted(post.likes, currentUser.id)
            if(vote){
                // setHasVoted(true)
                setUsersLikeId(vote.id)
                if(vote.is_like){
                    // setUpvote(true)
                    // setDownvote(false)
                    setUserlike(1)
                    setLikes((prev)=>(prev-1))
                } else {
                    // setUpvote(false)
                    // setDownvote(true)
                    setUserlike(-1)
                    setLikes((prev)=>(prev+1))
                }
            }
        }
    }, [])

    // useEffect(()=>{
    //     console.log("upvote is true")
    // }, [upvote==true])

    // useEffect(()=>{
    //     console.log("downvote is true")
    // }, [downvote==true])
    //sets the aggrigate value of like vs dislikes
    // useEffect(()=>{
    //     if (post.likes){
    //         setLikes(evaluateLikes(post.likes))
    //     }
    // }, [])

    //dynamically sets the css on the upvote and downvote arrow
    // const upvoteId = upvote? "voted" : ""
    // const downvoteId = downvote? "voted" : ""
    //disables buttons while a fetch is in progress
    const isDisabled = isLoading? "disabled": ""

    const [userLike, setUserlike] = useState(0)
    // const [upvoteId, setUpvoteId] = useState("")
    // const [downvoteId, setDownvoteId] = useState("")
    //first index is upvote, second is downvote
    const [voteId, setVoteId] = useState(["", ""])

    const sortLike =(str)=>{
        switch(str){
            case "0 up":
            case "-1 up":
                setUserlike(1)
                console.log("switch case 1ups")
                break
            case "0 down":
            case "1 down":
                setUserlike(-1)
                console.log("switch case -1ups")
                break
            case "1 up":
            case "-1 down":
                setUserlike(0)
                console.log("switch case 0ups")
                break
            default:
                console.log("default")
        }
    }

    const handleLikeCrud =(str)=>{
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
            dispatch(deleteLike(usersLikeId, post, currentUser.id))
        } else if (method=="PUT"){
            dispatch(updateLike(payload, usersLikeId, post, currentUser.id))
        } else {
            dispatch(createLike(payload, post))
            .then((like)=>setUsersLikeId(like.id))
        }
    }

    const handleUpvote = ()=>{
        console.log("hello")
        sortLike(`${userLike} up`)
        handleLikeCrud(`${userLike} up`)

    }

    const handleDownvote = ()=>{
        console.log("hello")
        sortLike(`${userLike} down`)
        handleLikeCrud(`${userLike} down`)
    }

    useEffect(()=>{
        console.log("userLike in useEffect", userLike)
        if(userLike===0){
            setVoteId(["", ""])
        } else if (userLike===1){
            setVoteId(["voted", ""])
        } else {
            setVoteId(["", "voted"])
        }
        console.log("voteId in useEffect", voteId)
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
