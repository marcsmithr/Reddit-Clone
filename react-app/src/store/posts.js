const LOAD = 'posts/LOAD'
const CREATE = 'posts/CREATE'
const GET_ONE = 'posts/GET_ONE'
const DELETE = 'posts/DELETE'
// const GET_SOME = 'posts/GET_SOME'



const loadAll = posts => ({
    type: LOAD,
    posts
})

const getOne = post => ({
    type: GET_ONE,
    post
})

// const getSome = posts => ({
//     type: GET_SOME,
//     posts
// })

const createPost = post => ({
    type: CREATE,
    post
})

const remove = id => ({
    type: DELETE,
    id
})




export const getOnePost = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`);
    if (response.ok){
        const postObj = await response.json();
        const post = postObj.Post
        dispatch(getOne(post))
        return post
    }
    return response
}

// export const getSomePosts = (community_name) => async dispatch => {
//     console.log('COMMUNITY NAME IN THUNK', community_name)
//     const response = await fetch(`/api/posts/${community_name}`)
//     console.log('RESPONSE IN THUNK', response)
//     if (response.ok){
//         const postsObj = await response.json();
//         console.log('POSTSOBJ', postsObj)
//         const posts = postsObj.Posts
//         console.log('POSTS', posts)
//         dispatch(getSome(posts))
//         return posts
//     }
//     return response
// }

export const allPosts = () => async dispatch => {
    const response = await fetch(`/api/posts`)
    if(response.ok){
        const postsObj = await response.json()
        const posts = postsObj.Posts
        dispatch(loadAll(posts))
        return posts
    }
}

export const postCreate = (post, community_name) => async dispatch => {
    console.log("COMMUNITY NAME IN CREATE POST", community_name)
    console.log("POST IN CREATE POST", post)
    const response = await fetch(`/api/communities/${community_name}/posts`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
      })
      console.log("RESPONSE IN CREATE POST", response)
    if(response.ok){
        const newPost = await response.json()
        console.log("NEWPOST IN CREATE POST", newPost)
        if(post.image){
            const payload = {
                "post_id": newPost.id,
                "url": post.image
            }
            const imageResponse = await fetch(`/api/posts/${newPost.id}/images`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            })
            if(imageResponse.ok){
                const i = await imageResponse.json()
                newPost.images = [i]
                dispatch(createPost(newPost))
                return newPost
            }
        }
        dispatch(createPost(newPost))
        return newPost
    }
}

export const deletePost = (id) => async dispatch => {
    console.log('id IN THUNK', id)
    const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    console.log('REPONSE----', response)
    if (response.ok){
        const deletedPost = await response.json()
        dispatch(remove(id))
        return deletedPost
    }
    return response
}




const initialState = {allPosts: {}, singlePost: {}}

const postReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case LOAD:{
            newState = {...state, allPosts: {...state.allPosts}, singlePost:{...state.singlePost}}
            let post2={}
            action.posts.forEach(post => {
                post2[post.id] = post
            });
            newState.allPosts = post2
            return newState
        }
        case CREATE:{
            newState = {...state, allPosts: {...state.allPosts}, singlePost:{...state.singlePost}, user: {...state.user}}
            newState.user[action.post.id] = action.review
            newState.allPosts[action.post.id] = action.post
            return newState
        }
        case GET_ONE: {
            newState = {
                ...state,
                allPosts: {...state.allPosts},
                singlePost: {},
                user: {...state.user}
            }
            newState.singlePost = action.post
            return newState
        }
        case DELETE: {
            newState = {...state, allPosts: {...state.allPosts}, singlePost:{...state.singleBusiness}}
            delete newState.allPosts[action.id]
            return newState
        }
        default:
            return state
    }
}

export default postReducer
