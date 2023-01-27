import React, { useState, createContext } from 'react';

export const PostFormContext = createContext()

export const PostFormProvider = props => {
    const [postTitle, setPostTitle] = useState('')
    const [postText, setPostText] = useState('')
    const [postImage, setPostImage] = useState('')

    return(
        <PostFormContext.Provider value={{ postTitle, setPostTitle, postText, setPostText, postImage, setPostImage }} >
            {props.children}
        </PostFormContext.Provider>
    )

}
