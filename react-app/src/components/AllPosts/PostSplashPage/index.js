import React from 'react'
import CreatePostForm from '../PostForm'
import { useHistory, useParams } from 'react-router-dom'
import "./index.css"

function PostSplashPage (){
    const {communityParam} = useParams()

    return(
        <div className='post-page-body'>
            <div className='post-page-content'>
                <div className='post-page-left-div'>
                    <div className='post-page-header'>
                        <h1>Create a post</h1>
                    </div>
                    <CreatePostForm/>
                </div>
                <div className='post-page-right-div'>
                </div>
            </div>
        </div>
    )
}

export default PostSplashPage
