import React, { useEffect, useMemo, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllComments } from '../../../store/comments'
import Comment from '../Comment'




function AllComments({rootComments}){
    // const dispatch = useDispatch()

    // const comments = useSelector((state)=> state.comments.allComments)

    if(!rootComments|| rootComments ===undefined) return null
    return (
        <div className='comments-inner-container'>
            {rootComments.map((comment)=>(
            <div key={comment.id} className='comment-outer-container'>
              <Comment comment={comment}/>
                </div>
            ))}
        </div>
    )
}

export default AllComments
