import React, {useContext, useEffect, useMemo, useState} from 'react'
import { useSelector } from 'react-redux'
import { CommentFormContext } from '../../context/CommentContext'
import AllComments from '../AllComments'
import CommentForm from '../CreateComment'
import EditCommentForm from '../EditComment/EditComment'
import './index.css'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
})


export function Comment({comment}){
    const[areChildrenHidden, setAreChildenHidden] = useState(false)
    const[replying, setReplying] = useState(false)

    const comments = Object.values(useSelector((state)=> state.comments.allComments))
    const post = useSelector((state)=> state.posts.singlePost)

    const {closeComment, setCloseComment, targetComment, setTargetComment} = useContext(CommentFormContext)

    const commentsByParentId = useMemo(()=>{
        const group = {}
        comments.forEach(comment =>{
            group[comment.parent_id] ||= []
            group[comment.parent_id].push(comment)
        })
        return group
    },[comments])

    function getReplies(parent_id){
        return commentsByParentId[parent_id]
    }

    const childComments = getReplies(comment.id)

    function hideReplies() {
        setAreChildenHidden(true)
    }

    function showReplies() {
        setAreChildenHidden(false)
    }

    function reply(){
        if(!replying) {
            setCloseComment(false)
            setReplying(true)}
        else {
            setCloseComment(true)
            setReplying(false)}
    }

    function editAComment(){
        setTargetComment(comment.id)
    }
    console.log("commentId typeof", typeof comment.id )

    let nestedCommentStackId = areChildrenHidden? "hidden" : ""
    let showReplyId = !areChildrenHidden? "hidden" : ""
    let replyingId = !replying||closeComment? "hidden" : ""

    if(!comment) return null
    return(
        <>
        {targetComment===0 && (
            <div className="comment-card">
            <div className='comment-header'>
                <span className='comment-username'>
                    {comment.user.username}
                </span>
                <span className='comment-date'>
                    {dateFormatter.format(Date.parse(comment.created_at))}
                </span>
            </div>
            <div className='comment-text'>
                {comment.text}
            </div>
            <div className='comment-footer'>
                <button className={`icon-button`} onClick={()=>reply()}>
                    <i className="fa-regular fa-comment"></i>
                    <span>Reply</span>
                </button>
                <button className={`icon-button`} onClick={()=>editAComment()}>
                    <i class="fa-regular fa-pen-to-square"></i>
                    <span>Edit</span>
                </button>
            </div>
            <div className='create-reply-container' id={replyingId} >
                <CommentForm post_id={post.id} parent_id={comment.id} replying={replying}/>
            </div>
            </div>
            )}
            {targetComment===comment.id && (
                <EditCommentForm text={comment.text} comment_id={comment.id}/>
            )}
            {childComments?.length > 0 && (
                <>
                    <div className='nested-comment-stack' id={nestedCommentStackId}>
                        <button className='collapse-line' aria-label='Hide Replies' onClick={()=>hideReplies()}/>
                        <div className='nested-comments' >
                            <AllComments rootComments={childComments}/>
                        </div>
                    </div>
                    <button className='show-replies-button' id={showReplyId} onClick={()=>showReplies()}><i className="fa-solid fa-up-right-and-down-left-from-center"></i></button>
                </>
            )}
        </>
    )
}

export default Comment
