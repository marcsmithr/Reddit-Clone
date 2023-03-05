import { useState, useContext } from "react"
import { useDispatch } from "react-redux"
import { commentCreate, CommentEdit } from "../../../store/comments"
import { CommentFormContext } from "../../context/CommentContext"


function EditCommentForm({text, comment_id}){
    const dispatch = useDispatch()
    const [commentText, setCommentText] = useState(text)

    const {closeComment, setCloseComment, setEditComment, targetComment, setTargetComment} = useContext(CommentFormContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        let comment = {
            text: commentText
        }
    let newComment = dispatch(CommentEdit(comment, comment_id))
    if(newComment){
        setCommentText('')
        setEditComment(false)
        setCloseComment(true)
        setTargetComment(0)
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
                        <button className="cancel-edit-comment-button" onClick={()=>setTargetComment(0)}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditCommentForm
