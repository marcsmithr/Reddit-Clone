import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PostCard from './PostCard'
import CreatePostCommunity from '../HomePage/CreatePostCommunity'
import './index.css'

function AllPosts() {

    const allPosts = useSelector(state => state.posts.allPosts)

    const posts = Object.values(allPosts)

    return (
        <div className='splash-page-body'>
            <div className='recent-activities'>
                <h1 id='recent-act-text'> Recent Activity </h1>
                <div className='posts-container'>
                    {posts.map((post) => (
                        <PostCard
                        post={post}
                        key={post.id}
                        />
                    ))}
                </div>
            </div>
                <CreatePostCommunity/>
        </div>
    )
}

export default AllPosts
