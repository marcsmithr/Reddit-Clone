import React, { useState, createContext } from 'react';

export const CommentFormContext = createContext()

export const CommentFormProvider = props => {
    const [closeComment, setCloseComment] = useState(false)
    const [editComment, setEditComment] = useState(false)
    const [targetComment, setTargetComment] = useState(0)


    return(
        <CommentFormContext.Provider value={{ closeComment, setCloseComment, editComment, setEditComment, targetComment, setTargetComment }} >
            {props.children}
        </CommentFormContext.Provider>
    )

}
