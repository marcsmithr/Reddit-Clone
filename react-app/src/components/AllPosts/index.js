import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PostCard from './PostCard'
import CreatePostCommunity from '../HomePage/CreatePostCommunity'
import CodeLangBox from '../HomePage/CodeLangBox'

import './index.css'

function AllPosts() {

    const allPosts = useSelector(state => state.posts.allPosts)

    const posts = Object.values(allPosts)

    return (
        <div className='home-page-body'>
            <div className='home-page-content'>
                <div className='left-main-home-div'>
                    <div className='left-main-home-header'>
                        <h1 id='recent-act-text'> Recent Activity </h1>
                    </div>
                    <div className='posts-container'>
                        {posts.map((post) => (
                            <PostCard
                            post={post}
                            key={post.id}
                            />
                        ))}
                    </div>
                </div>
                <div className='right-main-home-div'>
                    <CreatePostCommunity/>
                    <CodeLangBox/>
                </div>
            </div>
        </div>
    )
}

export default AllPosts
