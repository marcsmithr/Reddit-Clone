import React from 'react'
import CreatePostForm from '../PostForm'
import { useHistory, useParams } from 'react-router-dom'
import "./index.css"

function PostSplashPage (){
    const {communityParam} = useParams()

    return(
        <div className='post-page-body'>
            <div className='post-page-content'>
                <div className='post-page-left-div'>
                    <div className='post-page-header'>
                        <h1>Create a post</h1>
                    </div>
                    <CreatePostForm/>
                </div>
                <div className='post-page-right-div'>
                    <div className='posting-rules-container'>
                        <div className='posting-rules-header'>
                            <div className='posting-rules-icon'>
                                <img src='https://i.ibb.co/pLg64fC/seddit-mascot.png' ></img>
                            </div>
                            <div className='posting-rules-header-span'>
                                <span>Posting to Seddit</span>
                            </div>

                        </div>
                        <div className='posting-rule'>1. Remember the human</div>
                        <div className='posting-rule'>2. Behave like you would in real life</div>
                        <div className='posting-rule'>3. Look for the original source of content</div>
                        <div className='posting-rule'>4. Search for duplicates before posting</div>
                        <div className='posting-rule'>5. Read the community’s rules</div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostSplashPage
