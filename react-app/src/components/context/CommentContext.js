import React, { useState, createContext } from 'react';

export const CommentFormContext = createContext()

export const CommentFormProvider = props => {
    const [closeComment, setCloseComment] = useState(false)
    const [editComment, setEditComment] = useState(false)
    const [targetEditComment, setTargetEditComment] = useState(0)
    const [targetReplyComment, setTargetReplyComment] = useState(0)


    return(
        <CommentFormContext.Provider value={{ closeComment, setCloseComment, editComment, setEditComment, targetEditComment, setTargetEditComment, targetReplyComment, setTargetReplyComment }} >
            {props.children}
        </CommentFormContext.Provider>
    )

}
