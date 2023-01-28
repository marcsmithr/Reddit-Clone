import React, { useState, createContext } from 'react';

export const PostFormContext = createContext()

export const PostFormProvider = props => {
    const [postTitle, setPostTitle] = useState('')
    const [postText, setPostText] = useState('')
    const [postImage, setPostImage] = useState('')
    const [communityName, setCommunityName] = useState('')
    const [postForm, setPostForm] = useState(true)
    const [imageForm, setImageForm] = useState(false)

    return(
        <PostFormContext.Provider value={{ postTitle, setPostTitle, postText, setPostText, postImage,
         setPostImage, communityName, setCommunityName, postForm, setPostForm, imageForm, setImageForm }} >
            {props.children}
        </PostFormContext.Provider>
    )

}
