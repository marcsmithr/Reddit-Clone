import React from 'react'
import CreatePostForm from '../PostForm'
import { useHistory, useParams } from 'react-router-dom'

function PostSplashPage (){
    const {communityParam} = useParams()

    return(
        <div>
            <CreatePostForm/>
        </div>
    )
}

export default PostSplashPage
