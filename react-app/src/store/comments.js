const LOAD = 'comments/LOAD'
const CREATE = 'comments/CREATE'
const UPDATE = 'comments/UPDATE'
// const GET_ONE = 'comments/GET_ONE'
const DELETE = 'comments/DELETE'



const loadAll = comments => ({
    type: LOAD,
    comments
})

// const getOne = post => ({
//     type: GET_ONE,
//     post
// })


const createComment = comment => ({
    type: CREATE,
    comment
})

const update = comment => ({
    type: UPDATE,
    comment
})

const remove = id => ({
    type: DELETE,
    id
})




// export const getOnePost = (id) => async dispatch => {
//     const response = await fetch(`/api/posts/${id}`);
//     if (response.ok){
//         const postObj = await response.json();
//         const post = postObj.Post
//         dispatch(getOne(post))
//         return post
//     }
//     return response
// }

export const loadAllComments = (id)=> async dispatch =>{
    const response = await fetch(`/api/comments/post/${id}`)
    if(response.ok){
        const commentsObj = await response.json()
        const comments = commentsObj.Comments
        dispatch(loadAll(comments))
        return comments
    }
}


export const commentCreate = (comment, post_id, parent_id=0) => async dispatch => {
    const response = await fetch(`/api/comments/posts/${post_id}/comment/${parent_id}`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
      })
    if(response.ok){
        const newComment = await response.json()
        dispatch(createComment(newComment))
        return newComment
    }
}

export const commentEdit = (comment, comment_id, process="submit") => async dispatch => {
    if(process==="delete"){
        const response = await fetch(`/api/comments/${comment_id}/${process}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(comment)
        })

        if(response.ok){
            const newComment = await response.json()
            dispatch(update(newComment))
            return newComment
        }
    }else{
    const response = await fetch(`/api/comments/${comment_id}/${process}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
    })

    if(response.ok){
        const newComment = await response.json()
        dispatch(update(newComment))
        return newComment
    }
    }
}

export const deleteComment = (id) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok){
        const deletedComment = await response.json()
        dispatch(remove(id))
        return deletedComment
    }
    return response
}






const initialState = {allComments: {}, singleComment: {}}

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case LOAD:{
            newState = {...state, allComments: {...state.allComments}, singleComment:{...state.singleComment}}
            let comment2={}
            action.comments.forEach(comment => {
                comment2[comment.id] = comment
            });
            newState.allComments = comment2
            return newState
        }
        case CREATE:{
            newState = {...state, allComments: {...state.allComments}, singleComment:{...state.singlePost}}
            // newState.user[action.post.id] = action.review
            newState.allComments[action.comment.id] = action.comment
            return newState
        }
        // case GET_ONE: {
        //     newState = {
        //         ...state,
        //         allPosts: {...state.allPosts},
        //         singlePost: {},
        //         user: {...state.user}
        //     }
        //     newState.singlePost = action.post
        //     return newState
        // }
        case UPDATE: {
            newState = {...state, allComments: {...state.allComments} }
            newState.allComments[action.comment.id] = action.comment
            return newState
        }
        case DELETE: {
            newState = {...state, allComments: {...state.allComments}, singleComment:{...state.singleComment}}
            delete newState.allComments[action.id]
            return newState
        }
        default:
            return state
    }
}

export default commentReducer
