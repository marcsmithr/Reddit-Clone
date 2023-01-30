import React, { useContext, useEffect, useState } from 'react'
import { PostFormContext } from '../../context/PostFormContext'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { postCreate } from '../../../store/posts'
import './index.css'

function CreatePostForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    // const [ title, setTitle ] = useState('')
    // const [ text, setText ] = useState('')
    // const [image, setImage] = useState('')
    const [ errors, setErrors ] = useState([])
    const {postTitle, setPostTitle, postText, setPostText, postImage, setPostImage,
        communityName, setCommunityName, imageForm, setImageForm, postForm, setPostForm} = useContext(PostFormContext)

    const updateTitle = (e) => setPostTitle(e.target.value)
    const updateText = (e) => setPostText(e.target.value)
    const updateImage = (e) => setPostImage(e.target.value)

    const {communityParam} = useParams()


    console.log("COMMUNITY", communityName)

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
        setCommunityName(communityName)
        history.push(`/s/${communityName}/submit`)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()


        let payload;
        if(postImage){
            payload= {
                title: postTitle,
                text: postText,
                image: postImage
            }
        } else{
        payload = {
            title: postTitle,
            text: postText
        }
    }
        let newPost = await dispatch(postCreate(payload, communityName))
        if(newPost) clearData()
    }

    function postButton() {
        setImageForm(false)
        setPostForm(true)
    }

    function imageButton() {
        setPostForm(false)
        setImageForm(true)
    }


    return(
        <div className='post-page'>
            <select
            onChange={(e) => changeCommunity(e.target.value)}
            value={communityName}
            >
                    <option value="" disabled selected>Choose a Community</option>
                {communities.map((community)=>(
                    <option
                    value={community.name}
                    key={community.id}
                    >{community.name}</option>
                ))}
            </select>
            <div className='post-form-outer-container'>
                <div className='form-type-buttons-container'>
                    <button onClick={postButton}>Post</button>
                    <button onClick={imageButton}>Image</button>
                </div>
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
                    { (postForm===true)&&
                    <textarea
                        className='postText'
                        type={'text'}
                        placeholder={'Text (optional)'}
                        value={postText}
                        onChange={updateText}
                    />
                    }
                    { (imageForm===true)&&
                        <input
                            className="non-text-form-inputs"
                            type="url"
                            placeholder=" Image Url"
                            required
                            value={postImage}
                            onChange={updateImage}
                        />
                    }
                    {(!communityName) &&
                        <button className='postSubmit' disabled>Submit</button>
                    }
                    {(communityName) &&
                    <button className='postSubmit'>Submit</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CreatePostForm
