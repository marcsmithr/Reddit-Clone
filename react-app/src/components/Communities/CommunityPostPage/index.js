import React, { useEffect } from 'react'
import CreatePostForm from '../../AllPosts/PostForm'
import { useHistory, useParams } from 'react-router-dom'


function CommunityPostPage(){
    const {communityParam} = useParams()

    return(
        <div>
            <CreatePostForm communityParam={communityParam}/>
        </div>
    )
}

export default CommunityPostPage
