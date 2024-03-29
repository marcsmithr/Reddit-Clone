import React, { useContext, useEffect, useState, useCallback } from 'react'
import { PostFormContext } from '../../context/PostFormContext'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'
import { postCreate } from '../../../store/posts'
import handlePreviewImage from '../../../utils/ImageUploads/previewImage'
import './index.css'


function CreatePostForm(){
    const dispatch = useDispatch()
    const history = useHistory()

    //ALL THE VARIABLES IN MY USE STATE INCLUDING THOSE WITH CONTEXT
    const [ errors, setErrors ] = useState([])
    const [showErrors, setShowErrors] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [imageLoading, setImageLoading] = useState(false);
    const [preview, setPreview] = useState('')
    const {postTitle, setPostTitle, postText, setPostText, postImage, setPostImage,
        communityName, setCommunityName, imageForm, setImageForm, postForm, setPostForm} = useContext(PostFormContext)

    //UPDATES USESTATE AS FORM RECIEVES INPUT
    const updateTitle = (e) => setPostTitle(e.target.value)
    const updateText = (e) => setPostText(e.target.value)
    const updateImage = (e) => {
        setShowErrors([])
        if (!e.target.files || e.target.files.length === 0) {
            setPreview('')
        }
        setPostImage(e.target.files[0])
    }


    //GRABS THE COMMUNITIES TO BE USED IN THE COMMUNITY SELECTOR
    const communities = Object.values(useSelector((state) => state.communities.allCommunities))

    //CLEARS DATA AND RESETS FORM AFTER SUBMIT THEN SEND TO HOMEPAGE
    const clearData = () => {
        setImageLoading(false)
        setPostTitle('')
        setPostText('')
        setPostImage('')
        setCommunityName('')
        setPreview('')
        setErrors([])
        postButton()

        history.push(`/`)
    }
    //CHANGES DEFAULT POST PAGE TO COMMUNITY POST PAGE WHEN SELECTED
    const changeCommunity = (communityName) => {
        setCommunityName(communityName)
        history.push(`/s/${communityName}/submit`)
    }

    //HANDLE FORM SUBMISSION FUNCTION
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
            payload= {
                title: postTitle
            }
            let newPost = await dispatch(postCreate(payload, communityName, formData))
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

    //FORM VALIDATION USEEFFECT
    useEffect(()=>{
        let errors = []
        if(imageForm){
            if(postImage){
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
    }, [imageForm, postForm, postTitle, postImage, communityName, disabled])

    //PREVIEW FUNCTIONS
    const handleCreateBase64 = useCallback(handlePreviewImage,[])
    // const handleCreateBase64 = useCallback(async (e) => {
    //     const file = e.target.files[0];
    //     const convertToBase64 = (file) => {
    //         return new Promise((resolve, reject) => {
    //           const fileReader = new FileReader();
    //             fileReader.readAsDataURL(file);
    //             fileReader.onload = () => {
    //               resolve(fileReader.result);
    //             };

    //           fileReader.onerror = (error) => {
    //             reject(error);
    //           };
    //         });
    //       };
    //     const base64 = await convertToBase64(file);
    //     setPreview(base64);
    //   }, []);


      const updateAndPreview = (e) => {
        // debugger
        handleCreateBase64(e)
        .then(data=>setPreview(data))
        // handlePreviewImage(e)
        updateImage(e)
      }


    //SWITCHES THE FORM BETWEEN TEXTPOST MODE TO IMAGEPOST MODE
    function postButton() {
        setShowErrors([])
        setImageForm(false)
        setPostForm(true)
        setPreview('')
        setPostImage('')
    }

    function imageButton() {
        setShowErrors([])
        setPostForm(false)
        setImageForm(true)
        setPostText('')
    }

    //RESETS PREVIEW IMAGE WHEN X IS CLICKED
    function resetPreviewImage(){
        setPreview('')
        setPostImage('')
    }

    //STYLES BUTTONS BLUE WHEN POST OR IMAGE BUTTON IS SELECTED
    let postButtonId =  postForm ? "active" : ""
    let imageButtonId = imageForm ? "active" : ""


    let previewImageId = !preview? "hidden" : ""
    let createImageContainerId = preview? "hideBorders" : ""
    let uploadButtonId = preview? "hidden" : ""

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
                        <div className='create-post-image-container'
                        id={createImageContainerId}
                        >
                            <input
                                className="create-post-image"
                                id='file'
                                type="file"
                                accept='image/*, png, jpeg, jpg'
                                placeholder=" Image Url (optional)"
                                required
                                onChange={updateAndPreview}
                            />
                            <label for="file" className='create-post-image-label' id={uploadButtonId}>Upload</label>
                            <div className='preview-image-container' id={previewImageId}>
                                <div className='preview-image-x'>
                                    <span onClick={resetPreviewImage}>X</span>
                                </div>
                                <img src={preview} className='preview-img' id={previewImageId}></img>
                            </div>
                        </div>
                        }
                        <div className='post-submit-container'>
                            {(disabled) &&
                                <button className='post-submit' disabled>Post</button>
                            }
                            {(!disabled) &&
                                <button className='post-submit' type='submit'>Post</button>
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
