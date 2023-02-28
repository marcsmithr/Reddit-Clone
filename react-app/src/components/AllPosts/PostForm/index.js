import React, { useContext, useEffect, useState } from 'react'
import { PostFormContext } from '../../context/PostFormContext'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { postCreate } from '../../../store/posts'
import './index.css'
import { getUser } from '../../../store/session'

function CreatePostForm(){
    const dispatch = useDispatch()
    const history = useHistory()


    const [ errors, setErrors ] = useState([])
    const [showErrors, setShowErrors] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [imageLoading, setImageLoading] = useState(false);
    const [preview, setPreview] = useState('')
    const {postTitle, setPostTitle, postText, setPostText, postImage, setPostImage,
        communityName, setCommunityName, imageForm, setImageForm, postForm, setPostForm} = useContext(PostFormContext)


    const updateTitle = (e) => setPostTitle(e.target.value)
    const updateText = (e) => setPostText(e.target.value)
    const updateImage = (e) => {
        setShowErrors([])
        if (!e.target.files || e.target.files.length === 0) {
        setPreview('')
        }
        setPostImage(e.target.files[0])}

    // const {communityParam} = useParams()



    const communities = Object.values(useSelector((state) => state.communities.allCommunities))


    const clearData = () => {
        setImageLoading(false)
        setPostTitle('')
        setPostText('')
        setPostImage('')
        setCommunityName('')
        setErrors([])
        postButton()

        history.push(`/`)
    }

    const changeCommunity = (communityName) => {
        setCommunityName(communityName)
        history.push(`/s/${communityName}/submit`)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(errors){
            setShowErrors(errors)
        }
        let payload;
        if(postImage){
            setImageLoading(true);
            const formData = new FormData();
            formData.append("image", postImage);
            console.log("FORMDATA.IMAGE IN HANDLE SUBMIT", formData.get('image'))
            console.log("POST IMAGE FILE OBJ IN SUBMIT", postImage)
            payload= {
                title: postTitle
            }
            let newPost = await dispatch(postCreate(payload, communityName, formData))
            console.log("POSTCREATE RESPONSE IN HANDLE SUBMIT", newPost)
            if(newPost) clearData()
        } else{
            payload = {
                title: postTitle,
                text: postText
            }
            let newPost = await dispatch(postCreate(payload, communityName))
            if(newPost) clearData()
        }
    }

    useEffect(()=>{
        const errors = []
        if(imageForm){
            if(postImage){
                console.log(postImage?.type)
                if(postImage?.type !== 'image/jpg' && postImage?.type !== 'image/png' && postImage?.type !== 'image/jpeg'){
                    errors.push('Please select a valid image file type')
                    setShowErrors(['Please select a valid image file type (jpg, png, jpeg)'])
                }
            }
            if(!postImage){
                errors.push('Please select an image to upload')
            }
        }
            if(!postTitle){
            errors.push('Please fill out the post title')
        }
        if(!communityName){
            errors.push('Please select a community')
        }
        if (errors.length > 0) setDisabled(true)
        else setDisabled(false)
        setErrors(errors)
        console.log("ERRORS", errors)
    }, [imageForm, postForm, postTitle, postImage, communityName, disabled])

    useEffect(() => {
        if (!postImage) {
            setPreview('')
            return
        }
        if (postImage?.type !== 'image/jpg' && postImage?.type !== 'image/png' && postImage?.type !== 'image/jpeg') return
        const objectUrl = URL.createObjectURL(postImage)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [postImage])

    function postButton() {
        setShowErrors([])
        setImageForm(false)
        setPostForm(true)
        setPostImage('')
    }

    function imageButton() {
        setShowErrors([])
        setPostForm(false)
        setImageForm(true)
        setPostText('')
    }

    let postButtonId =  postForm ? "active" : ""
    let imageButtonId = imageForm ? "active" : ""

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
                <button onClick={postButton} className="form-type-button" id={postButtonId}>
                        <i className="fa-regular fa-pen-to-square"></i>
                         Post
                </button>
                <button  onClick={imageButton} className="form-type-button" id={imageButtonId}>
                        <i className="fa-regular fa-image"></i>
                        Image
                </button>
                </div>
                <div className='post-create-container'>
                    <form onSubmit={handleSubmit} className='post-form'>
                    {showErrors.length !== 0 &&
                        <ul style={{"marginBottom":"0px"}} className="errors-list">
                        {showErrors.map((showErrors, idx) => <li key={idx}>{showErrors}</li>)}
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
                        <div className='create-post-image-container'>
                            <input
                                className="create-post-image"
                                id='file'
                                type="file"
                                accept='image/*, png, jpeg, jpg'
                                placeholder=" Image Url (optional)"
                                required
                                onChange={updateImage}
                            />
                            <label for="file" className='create-post-image-lable'>Upload</label>
                            <img src='preview'></img>

                        </div>
                        }
                        <div className='post-submit-container'>
                            {(disabled) &&
                                <button className='post-submit' disabled>Post</button>
                            }
                            {(!disabled) &&
                            <button className='post-submit'>Post</button>
                            }
                            {(imageLoading)&& <p>Loading...</p>}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePostForm
