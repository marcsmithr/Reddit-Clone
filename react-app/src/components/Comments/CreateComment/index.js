import { useState } from "react"
import { useDispatch } from "react-redux"
import { createComment } from "../../../store/comments"


function CommentForm({post_id, parent_id = null}){
    const dispatch = useDispatch()
    [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.prevent.default
        let comment = {
            text
        }
        dispatch(createComment(comment, post_id, parent_id))
    }
    const updateText = (e) => setPostText(e.target.value)

    return(
        <form onSubmit={handleSubmit} className='comment-form'>
            <div>
                <textarea
                className="create-comment-text"
                placeholder="Comment..."
                value={text}
                onchange={updateText}
                maxLength='1000'

                />
                <button>Comment</button>
            </div>
        </form>
    )
}

export default CommentForm
