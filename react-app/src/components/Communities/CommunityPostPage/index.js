import React, { useEffect } from 'react'
import CreatePostForm from '../../AllPosts/PostForm'
import { useHistory, useParams } from 'react-router-dom'


function CommunityPostPage(){
    const {communityParam} = useParams()

    return(
        <div className='post-page-body'>
            <div className='post-page-content'>
                <div className='post-page-left-div'>
                    <div className='post-page-header'>
                    <h1>Create a post</h1>
            <CreatePostForm communityParam={communityParam}/>
        </div>
                </div>
                <div className='post-page-right-div'>
                </div>
             </div>
        </div>
    )
}

export default CommunityPostPage
