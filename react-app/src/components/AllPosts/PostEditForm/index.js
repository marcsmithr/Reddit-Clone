import React, { useContext, useEffect, useState } from 'react'
import { PostFormContext } from '../../context/PostFormContext'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { allPosts, getOnePost, postCreate, postEdit } from '../../../store/posts'
import './index.css'

function EditPostForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [ title, setTitle ] = useState('')
    const [ text, setText ] = useState('')
    const [image, setImage] = useState('')
    const [ errors, setErrors ] = useState([])

    const updateTitle = (e) => setTitle(e.target.value)
    const updateText = (e) => setText(e.target.value)
    const updateImage = (e) => setImage(e.target.value)

    const {communityName, post_id} = useParams()

    const {imageForm, setImageForm, postForm, setPostForm} = useContext(PostFormContext)
    const communities = Object.values(useSelector((state) => state.communities.allCommunities))
    const post = useSelector((state)=> state.posts.singlePost)


    const clearData = (newReview) => {
        setTitle('')
        setText('')
        setImage('')
        setImageForm(false)
        setPostForm(true)
        setErrors([])

        history.push(`/`)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()


        let payload;
        if(image){
            console.log("hello")
            payload= {
                title,
                image
            }
        } else{
            console.log('hi')
            payload = {
            title,
            text
        }
    }
    let newPost = await dispatch(postEdit(payload, post_id))

    if(newPost) {
        await dispatch(allPosts())
        await dispatch(getOnePost(post.id))
        clearData()}
}


useEffect(()=> {
    dispatch(getOnePost(post_id))
    .then((res)=>{
        setTitle(res.title)
        if(res.text){
            setText(res.text)
        }
        if(!res.text){
            setImage(res.images[0].url)
        }
    })
}, [dispatch, post_id])

return(
    <div className='post-page'>
            <div className='post-page-header'>
                <h1>Edit post</h1>
            </div>
            <div className='post-form-outer-container'>
                <div className='post-create-container'>
                    <form onSubmit={handleSubmit} className='post-edit-form'>
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
                                value={title}
                                onChange={updateTitle}
                                maxLength="200"
                            />
                        { (post.text)&&
                        <textarea
                                className='post-text'
                                type={'text'}
                                placeholder={'Text (optional)'}
                                value={text}
                                onChange={updateText}
                                maxLength="1000"
                            />
                        }
                        { !post.text && (
                            <input
                                    className="post-image"
                                    type="url"
                                    placeholder=" Image Url (optional)"
                                    required
                                    value={image}
                                    onChange={updateImage}
                                />

                            )}
                        <div className='post-submit-container'>
                                {(!title) &&
                                    <button className='post-submit' disabled>Post</button>
                                }
                                {(title) &&
                                <button className='post-submit'>Post</button>
                                }
                            </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPostForm
