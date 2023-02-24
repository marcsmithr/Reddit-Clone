import React, { useEffect } from 'react'
import CreatePostForm from '../../AllPosts/PostForm'
import CommunityPostDetails from './PostCommunityDetails'
import { getOneCommunity } from '../../../store/communities'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


function CommunityPostPage(){
    const dispatch = useDispatch()
    const {communityParam} = useParams()
    // const community = useSelector((state)=> state.communities.singleCommunity)

    // useEffect (()=>{
    //     dispatch(getOneCommunity(communityParam))
    // }, [communityParam])

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
                    <div className='post-page-right-div-content'>
                        <CommunityPostDetails/>
                    </div>
                </div>
             </div>
        </div>
    )
}

export default CommunityPostPage
