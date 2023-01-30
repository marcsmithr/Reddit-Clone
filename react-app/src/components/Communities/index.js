import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import PostCard from '../AllPosts/PostCard';

const CommunityPage = () => {
    const {community_name} = useParams()
    console.log('COMMUNITY_NAME', community_name)
    const allPosts = Object.values(useSelector((state) => state.posts.allPosts))
    const communityPosts = allPosts.filter((post) => community_name === post.community_name)
    console.log("COMMUNITYPOSTS", communityPosts)


    return(
        <div>
            <div className='posts-container'>
                {communityPosts.map((post) => (
                    <PostCard
                    post={post}
                    key={post.id}
                    />
                ))}
            </div>
        </div>
    )




}

export default CommunityPage
