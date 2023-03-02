import React from 'react'

export function Comment({comment}){
    console.log("Text in Comment", comment.text)

    if(!comment) return null
    return(
        <div className="comment-card">
            <div>
                <span>{comment.text}</span>
            </div>
        </div>
    )
}

export default Comment
