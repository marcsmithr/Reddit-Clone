import React, {useMemo, useState} from 'react'
import { useSelector } from 'react-redux'
import AllComments from '../AllComments'
import './index.css'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
})


export function Comment({comment}){
    console.log("Text in Comment", comment.text)
    const[areChildrenHidden, setAreChildenHidden] = useState(false)
    console.log("arechildrenhidden", areChildrenHidden)

    const comments = Object.values(useSelector((state)=> state.comments.allComments))
    const commentsByParentId = useMemo(()=>{
        const group = {}
        comments.forEach(comment =>{
            group[comment.parent_id] ||= []
            group[comment.parent_id].push(comment)
        })
        console.log("group in comments",group)
        return group
    }, [])

    function getReplies(parent_id){
        return commentsByParentId[parent_id]
    }

    const childComments = getReplies(comment.id)

    function hideReplies() {
        console.log("arechildrenhidden", areChildrenHidden)
        setAreChildenHidden(true)
    }

    function showReplies() {
        console.log("arechildrenhidden", areChildrenHidden)
        setAreChildenHidden(false)
    }

    let nestedCommentStackId = areChildrenHidden? "hidden" : ""
    let showReplyId = !areChildrenHidden? "hidden" : ""

    if(!comment) return null
    return(
        <>
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
            </div>
            </div>
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
