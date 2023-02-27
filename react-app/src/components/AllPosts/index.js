import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from './PostCard'
import CreatePostCommunity from '../HomePage/CreatePostCommunity'
import CodeLangBox from '../HomePage/CodeLangBox'
import { PostFormContext } from '../context/PostFormContext'

import './index.css'

function AllPosts() {
    const dispatch = useDispatch

    const {postTitle, setPostTitle, postText, setPostText, postImage, setPostImage,
        communityName, setCommunityName, imageForm, setImageForm, postForm, setPostForm} = useContext(PostFormContext)

    const allPosts = useSelector(state => state.posts.allPosts)

    function postButton() {
        setImageForm(false)
        setPostForm(true)
        setPostImage('')
    }

    const posts = Object.values(allPosts)
    const clearData = () => {
        setPostTitle('')
        setPostText('')
        setPostImage('')
        setCommunityName('')
        postButton()
    }

    useEffect(()=>{
        clearData()
    })

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
