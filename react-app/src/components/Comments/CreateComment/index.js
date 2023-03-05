import { useState } from "react"
import { useDispatch } from "react-redux"
import { commentCreate } from "../../../store/comments"


function CommentForm({post_id, parent_id = 0}){
    const dispatch = useDispatch()
    const [commentText, setCommentText] = useState('')
    console.log(commentText)
    const handleSubmit = (e) => {
        e.preventDefault();
        let comment = {
            text: commentText
        }
        dispatch(commentCreate(comment, post_id, parent_id))
    }
    const updateText = (e) => setCommentText(e.target.value)

    return(
        <div className="create-comment-form-inner-container">
            <form onSubmit={handleSubmit} className='comment-form'>
                <div>
                    <textarea
                    className="create-comment-text"
                    type={'text'}
                    placeholder={'What are your thoughts?'}
                    value={commentText}
                    onChange={updateText}
                    maxLength="1000"
                    required
                    />
                    <div className="create-comment-button-container">
                        <button className="create-comment-button">Comment</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CommentForm
