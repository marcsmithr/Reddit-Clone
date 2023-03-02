import React, { useEffect, useMemo, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllComments } from '../../../store/comments'
import Comment from '../Comment'

console.log("COMMENT COMPONENT", Comment)


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

    return (
        <div>
            {rootComments.map((comment)=>(
            <div>
                {/* {console.log("hello from foreach", comment)}
                <Comment comment={comment}/> */}
                {console.log("Comment in foreach", comment.text)}
              {comment.text}
                </div>
            ))}
        </div>
    )
}

export default AllComments
