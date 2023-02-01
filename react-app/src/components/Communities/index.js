import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import CommunityDetails from './CommunityDetails';
import DeleteCommunityButton from './DeleteCommunity';
import EditCommunityButton from './EditCommunity';
import PostCard from '../AllPosts/PostCard';
import { getOneCommunity } from '../../store/communities';
import './index.css'

const CommunityPage = () => {
    const dispatch = useDispatch()
    const {community_name} = useParams()

    const allPosts = Object.values(useSelector((state) => state.posts.allPosts))
    const communityPosts = allPosts.filter((post) => community_name === post.community_name)
    const community = useSelector((state)=> state.communities.singleCommunity)
    const currentUser = useSelector(state => state.session.user)

    console.log("COMMUNITY", community)
    useEffect(()=>{
        dispatch(getOneCommunity(community_name))
    },[dispatch, community_name])


    if(!community) return null
    return(
        <div className='community-page'>
            <div className='community-page-header'>
                <div className='community-page-banner'>
                    <img src={community.community_banner} alt="community banner"></img>
                </div>
                <div className='community-page-lower-header'>
                    <div className='community-icon'>
                        <img src={community.community_image} alt="community icon"></img>
                    </div>
                    <div className='community-page-name-container'>
                        <div className='community-page-title'>
                            <h1>{community.title}</h1>
                        </div>
                        <div className='community-page-name'>
                            <span>s/{community.name}</span>
                        </div>

                    </div>
                        {currentUser && currentUser.id===community.owner_id&&(
                    <div className='community-page-owner-crud'>
                        <div>
                            <EditCommunityButton community={community}/>
                        </div>
                        <div>
                            <DeleteCommunityButton community={community}/>
                        </div>
                    </div>
                        )}
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
                <div className='right-main-community-div'>
                    <CommunityDetails community={community}/>
                </div>
            </div>
        </div>
    </div>
    )




}

export default CommunityPage
