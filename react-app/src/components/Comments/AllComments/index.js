import React, { useEffect, useMemo, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllComments } from '../../../store/comments'
import Comment from '../Comment'




function AllComments({comments}){
    // const dispatch = useDispatch()

    // const comments = useSelector((state)=> state.comments.allComments)

    console.log("comments in AllComments", comments)
    const commentsByParentId = useMemo(()=>{
        console.log("hello from commentsByParent")
        const group = {}
        comments.forEach(comment =>{
            group[comment.parent_id] ||= []
            group[comment.parent_id].push(comment)
        })
        console.log("group in commentsByParent", group)
        return group
    }, [comments])

    // function getReplies(parent_id){
    //     return commentsByParentId[parent_id]
    // }
    const rootComments = commentsByParentId[null]
    console.log("rootComments in AllComments", rootComments)

    if(!comments) return null
    return (
        <div>
            {rootComments.forEach((comment)=>
            <div>
                {console.log("hello from foreach", comment)}
                <Comment comment={comment}/>
                </div>
            )}
        </div>
    )
}

export default AllComments
