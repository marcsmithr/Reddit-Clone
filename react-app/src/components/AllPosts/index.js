import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PostCard from './PostCard'
import './index.css'

function AllPosts() {

    const allPosts = useSelector(state => state.posts.allPosts)
    console.log("ALL POSTS IN ALL POSTS" , allPosts)

    const posts = Object.values(allPosts)

    return (
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
    )
}

export default AllPosts
