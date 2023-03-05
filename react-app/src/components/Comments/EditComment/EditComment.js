import { useState, useContext } from "react"
import { useDispatch } from "react-redux"
import { commentEdit } from "../../../store/comments"
import { CommentFormContext } from "../../context/CommentContext"


function EditCommentForm({text, comment_id}){
    const dispatch = useDispatch()
    const [commentText, setCommentText] = useState(text)

    const {closeComment, setCloseComment, setEditComment, setTargetEditComment} = useContext(CommentFormContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        let comment = {
            text: commentText
        }
    let newComment = dispatch(commentEdit(comment, comment_id))
    if(newComment){
        setCommentText('')
        setEditComment(false)
        setCloseComment(true)
        setTargetEditComment(0)
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
                        <button className="cancel-edit-comment-button" onClick={()=>setTargetEditComment(0)}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditCommentForm
