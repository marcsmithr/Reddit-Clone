import React, { useEffect, useMemo, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllComments } from '../../../store/comments'
import Comment from '../Comment'


console.log("COMMENT COMPONENT", Comment)


function AllComments({rootComments}){
    // const dispatch = useDispatch()

    // const comments = useSelector((state)=> state.comments.allComments)

    console.log("rootComments in AllComments", rootComments)
    if(!rootComments|| rootComments ===undefined) return null
    return (
        <div className='comments-inner-container'>
            {rootComments.map((comment)=>(
            <div key={comment.id} className='comment-outer-container'>
                {/* {console.log("hello from foreach", comment)}
                <Comment comment={comment}/> */}
                {console.log("Comment in foreach", comment.text)}
              <Comment comment={comment}/>
                </div>
            ))}
        </div>
    )
}

export default AllComments
