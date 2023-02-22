const LOAD = 'comments/LOAD'
// const CREATE = 'posts/CREATE'
// const UPDATE = 'posts/UPDATE'
// const GET_ONE = 'posts/GET_ONE'
// const DELETE = 'posts/DELETE'



const loadAll = comments => ({
    type: LOAD,
    comments
})

// const getOne = post => ({
//     type: GET_ONE,
//     post
// })


// const createPost = post => ({
//     type: CREATE,
//     post
// })

// const update = post => ({
//     type: UPDATE,
//     post
// })

// const remove = id => ({
//     type: DELETE,
//     id
// })




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

export const allComments = (id) => async dispatch => {
    console.log("HELLO FROM ALLCOMMENTS")
    const response = await fetch(`/api/comments/post/${id}`)
    console.log("RESPONSE FROM ALLComments", response)
    if(response.ok){
        const commentsObj = await response.json()
        const comments = commentsObj.Comments
        dispatch(loadAll(comments))
        return comments
    }
}

// export const postCreate = (post, community_name) => async dispatch => {
//     // console.log("COMMUNITY NAME IN CREATE POST", community_name)
//     // console.log("POST IN CREATE POST", post)
//     const response = await fetch(`/api/communities/${community_name}/posts`, {
//         method: 'POST',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(post)
//       })
//     //   console.log("RESPONSE IN CREATE POST", response)
//     if(response.ok){
//         const newPost = await response.json()
//         // console.log("NEWPOST IN CREATE POST", newPost)
//         if(post.image){
//             const payload = {
//                 "post_id": newPost.id,
//                 "url": post.image
//             }
//             const imageResponse = await fetch(`/api/posts/${newPost.id}/images`, {
//                 method: "POST",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify(payload)
//             })
//             if(imageResponse.ok){
//                 const i = await imageResponse.json()
//                 newPost.images = [i]
//                 dispatch(createPost(newPost))
//                 return newPost
//             }
//         }
//         dispatch(createPost(newPost))
//         return newPost
//     }
// }

// export const postEdit = (post, post_id) => async dispatch => {
//     console.log('Post IN THE THUNK ', post)
//     const response = await fetch(`/api/posts/${post_id}`, {
//         method: 'PUT',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(post)
//     })
//     console.log("RESPONSE IN THE THUNK", response)

//     if(response.ok){
//         const newPost = await response.json()
//         // console.log("NEWPOST IN CREATE POST", newPost)
//         if(post.image){
//             const payload = {
//                 "post_id": newPost.id,
//                 "url": post.image
//             }
//             const imageResponse = await fetch(`/api/posts/${newPost.id}/image`, {
//                 method: "PUT",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify(payload)
//             })
//             if(imageResponse.ok){
//                 const i = await imageResponse.json()
//                 newPost.images[i.id] = [i]
//                 dispatch(update(newPost))
//                 return newPost
//             }
//         }
//         dispatch(createPost(newPost))
//         return newPost
//     }
// }


// export const deletePost = (id) => async dispatch => {
//     console.log('id IN DELETE THUNK', id)
//     const response = await fetch(`/api/posts/${id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//     })
//     console.log('REPONSE----', response)
//     if (response.ok){
//         const deletedPost = await response.json()
//         dispatch(remove(id))
//         return deletedPost
//     }
//     return response
// }




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
        // case CREATE:{
        //     newState = {...state, allPosts: {...state.allPosts}, singlePost:{...state.singlePost}, user: {...state.user}}
        //     newState.user[action.post.id] = action.review
        //     newState.allPosts[action.post.id] = action.post
        //     return newState
        // }
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
        // case UPDATE: {
        //     newState = {...state, allPosts: {...state.allPosts} }
        //     newState.allPosts[action.post.id] = action.post
        //     return newState
        // }
        // case DELETE: {
        //     newState = {...state, allPosts: {...state.allPosts}, singlePost:{...state.singleBusiness}}
        //     delete newState.allPosts[action.id]
        //     return newState
        // }
        default:
            return state
    }
}

export default commentReducer
