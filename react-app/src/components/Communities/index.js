import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import PostCard from '../AllPosts/PostCard';
import { getOneCommunity } from '../../store/communities';
import './index.css'

const CommunityPage = () => {
    const dispatch = useDispatch()
    const {community_name} = useParams()
    const allPosts = Object.values(useSelector((state) => state.posts.allPosts))
    const communityPosts = allPosts.filter((post) => community_name === post.community_name)
    const community = useSelector((state)=> state.communities.singleCommunity)
    console.log("COMMUNITY", community)
    useEffect(()=>{
        dispatch(getOneCommunity(community_name))
    },[dispatch, community_name])


    if(!community) return null
    return(
        <div className='community-page'>
            <div className='community-header'>
                <div className='community-banner'>
                    <img src={community.community_banner} alt="community banner"></img>
                </div>
                <div>

                </div>
                <div>
                    
                </div>
                <div>

                </div>
            </div>
            <div className='community-page-body'>
            <div className='community-page-content'>
                <div className='left-main-community-div'>
                    <div className='posts-container'>
                        {communityPosts.map((post) => (
                            <PostCard
                            post={post}
                            key={post.id}
                            />
                        ))}
                    </div>
                </div>
                <div className='right-main-home-div'>
                    placeholder
                </div>
            </div>
        </div>
    </div>
    )




}

export default CommunityPage
