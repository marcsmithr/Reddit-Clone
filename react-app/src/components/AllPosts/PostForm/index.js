import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createPost } from '../../../store/posts'
import './index.css'

function CreatePostForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [ title, setTitle ] = useState('')
    const [ text, setText ] = useState('')
    const [ errors, setErrors ] = useState([])

    const updateTitle = (e) => setTitle(e.target.value)
    const updateText = (e) => setText(e.target.value)


    const clearData = (newReview) => {
        setTitle('')
        setText('')
        setErrors([])

        history.push(`/`)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        let payload;

        payload = {
            title,
            text
        }

        let newPost = await dispatch(createPost(payload))
        if(newPost) clearData()
    }

    return(
        <div className='postForm'>
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
                    value={title}
                    onChange={updateTitle}
                />
                <textarea
                    className='postText'
                    type={'text'}
                    placeholder={'Text (optional)'}
                    value={text}
                    onChange={updateText}
                />
                <button className='postSubmit'>Submit</button>
            </form>
        </div>
    )
}

export default CreatePostForm