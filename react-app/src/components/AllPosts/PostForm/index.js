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
        setPostImage('')
    }

    function imageButton() {
        setPostForm(false)
        setImageForm(true)
        setPostText('')
    }


    return(
        <div className='post-page'>
            <select
            onChange={(e) => changeCommunity(e.target.value)}
            value={communityName}
            className="post-community-select"
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
                    {}
                    <button onClick={postButton} className="form-type-button">
                        <i class="fa-regular fa-pen-to-square"></i>
                         Post
                    </button>
                    <button onClick={imageButton} className="form-type-button">
                        <i class="fa-regular fa-image"></i>
                        Image
                    </button>
                </div>
                <div className='post-create-container'>
                    <form onSubmit={handleSubmit} className='post-form'>
                    {errors.length !== 0 &&
                        <ul style={{"marginBottom":"0px"}}>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    }
                        <textarea
                            className='post-title'
                            type={'text'}
                            placeholder={'Title'}
                            required
                            value={postTitle}
                            onChange={updateTitle}
                            maxLength="200"
                        />
                        { (postForm===true)&&
                        <textarea
                            className='post-text'
                            type={'text'}
                            placeholder={'Text (optional)'}
                            value={postText}
                            onChange={updateText}
                            maxLength="1000"
                        />
                        }
                        { (imageForm===true)&&
                            <input
                                className="post-image"
                                type="url"
                                placeholder=" Image Url (optional)"
                                required
                                value={postImage}
                                onChange={updateImage}
                            />
                        }
                        <div className='post-submit-container'>
                            {(!communityName || !postTitle) &&
                                <button className='post-submit' disabled>Post</button>
                            }
                            {(communityName && postTitle) &&
                            <button className='post-submit'>Post</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePostForm
