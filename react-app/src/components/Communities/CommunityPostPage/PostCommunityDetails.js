import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneCommunity } from '../../../store/communities'

import './index.css'

function CommunityPostDetails(){

    const dispatch = useDispatch()
    const {community_name} = useParams()
    console.log(community_name)
    const community = useSelector((state)=> state.communities.singleCommunity)

    useEffect (()=>{
        dispatch(getOneCommunity(community_name))
    }, [community_name])

    return (
        <div className="community-post-details-container">
            <div className='community-post-banner'>
                <img src={community.community_banner} alt="community banner"></img>
            </div>
            <div className='community-post-details-content-container'>
                <div className="community-post-details-header">
                    <div className='community-post-icon'>
                        <img src={community.community_image} alt="community icon"></img>
                    </div>
                    <div className='community-post-span'>
                        <span>s/{community.name}</span>
                    </div>
                </div>
                <div className="community-post-details-details">
                    <div className="community-post-details-decription">
                        <span>{community.description}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityPostDetails
