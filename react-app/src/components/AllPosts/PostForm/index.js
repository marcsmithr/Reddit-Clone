import React, { useContext, useEffect, useState } from 'react'
import { PostFormContext } from '../../context/PostFormContext'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createPost } from '../../../store/posts'
import './index.css'

function CreatePostForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    // const [ title, setTitle ] = useState('')
    // const [ text, setText ] = useState('')
    // const [image, setImage] = useState('')
    const [ errors, setErrors ] = useState([])

    const {postTitle, setPostTitle, postText, setPostText, postImage, setPostImage} = useContext(PostFormContext)

    const updateTitle = (e) => setPostTitle(e.target.value)
    const updateText = (e) => setPostText(e.target.value)
    const updateImage = (e) => setPostImage(e.target.value)

    const communities = Object.values(useSelector((state) => state.communities.allCommunities))
    console.log("COMMUNITIES IN CREATE POSTFORM", communities)


    const clearData = (newReview) => {
        setPostTitle('')
        setPostText('')
        setPostImage('')
        setErrors([])

        history.push(`/`)
    }

    const changeCommunity = (communityName) => {
        history.push(`/s/${communityName}/submit`)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        let payload;

        payload = {
            postTitle,
            postText
        }

        let newPost = await dispatch(createPost(payload))
        if(newPost) history.push('/')
    }

    return(
        <div className='post-page'>
            <select
            onChange={(e) => changeCommunity(e.target.value)}
            >
                    <option value="" disabled selected>Choose a Community</option>
                {communities.map((community)=>(
                    <option
                    value={community.name}

                    >{community.name}</option>
                ))}
            </select>
            <form onSubmit={handleSubmit} className='postCreateContainer'>
            {errors.length !== 0 &&
                <ul style={{"marginBottom":"0px"}}>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            }
                <textarea
                    className='postTitle'
                    type={'text'}
                    placeholder={'Title'}
                    required
                    value={postTitle}
                    onChange={updateTitle}
                />
                <textarea
                    className='postText'
                    type={'text'}
                    placeholder={'Text (optional)'}
                    value={postText}
                    onChange={updateText}
                />
                <input
                    className="non-text-form-inputs"
                    type="url"
                    placeholder=" Image Url"
                    value={postImage}
                    onChange={updateImage}
                />
                <button className='postSubmit'>Submit</button>
            </form>
        </div>
    )
}

export default CreatePostForm
