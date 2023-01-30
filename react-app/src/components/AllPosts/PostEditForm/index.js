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
    const images = post.images


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
        if(res.images){
            setImage(res.images[0].url)
        }
    })
}, [dispatch, post_id])
console.log("HELLO THERE")

return(
    <div className='post-page'>
            <div className='post-form-outer-container'>
                <div className='form-type-buttons-container'>
                </div>
                <form onSubmit={handleSubmit} className='postEditContainer'>
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
                        value={title}
                        onChange={updateTitle}
                    />
                    { (post.text)&&
                    <textarea
                        className='postText'
                        type={'text'}
                        placeholder={'Text (optional)'}
                        value={text}
                        onChange={updateText}
                    />
                    }
                    { (images)&&
                        <input
                            className="non-text-form-inputs"
                            type="url"
                            placeholder=" Image Url"
                            required
                            value={image}
                            onChange={updateImage}
                        />
                    }
                    <button className='postSubmit'>Submit</button>

                </form>
            </div>
        </div>
    )
}

export default EditPostForm
