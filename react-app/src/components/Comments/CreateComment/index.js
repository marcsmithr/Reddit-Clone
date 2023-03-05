import { useState, useContext } from "react"
import { useDispatch } from "react-redux"
import { commentCreate } from "../../../store/comments"
import { CommentFormContext } from "../../context/CommentContext"


function CommentForm({post_id, parent_id = 0}){
    const dispatch = useDispatch()
    const [commentText, setCommentText] = useState('')

    const {closeComment, setCloseComment, setTargetEditComment, setTargetReplyComment} = useContext(CommentFormContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        let comment = {
            text: commentText
        }
    let newComment = dispatch(commentCreate(comment, post_id, parent_id))
    if(newComment){
        setCommentText('')
        setCloseComment(true)
        setTargetEditComment(0)
        setTargetReplyComment(0)
    }
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
