const LOAD = 'posts/LOAD'
const CREATE = 'posts/CREATE'
const UPDATE = 'posts/UPDATE'
const GET_ONE = 'posts/GET_ONE'
const DELETE = 'posts/DELETE'




const loadAll = posts => ({
    type: LOAD,
    posts
})

const getOne = post => ({
    type: GET_ONE,
    post
})



const createPost = post => ({
    type: CREATE,
    post
})

const update = post => ({
    type: UPDATE,
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


export const allPosts = () => async dispatch => {
    const response = await fetch(`/api/posts`)
    if(response.ok){
        const postsObj = await response.json()
        const posts = postsObj.Posts
        dispatch(loadAll(posts))
        return posts
    }
}

export const postCreate = (post, community_name, formData=null) => async dispatch => {

    const response = await fetch(`/api/communities/${community_name}/posts`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
      })

    if(response.ok){
        const newPost = await response.json()
        if(formData){

            const imageResponse = await fetch(`/api/posts/${newPost.id}/images`, {
                method: "POST",
                body: formData
            })
            if(imageResponse.ok){
                const newImage = await imageResponse.json()
                newPost.images = [newImage]
                dispatch(createPost(newPost))
                return newPost
            }
        }
        dispatch(createPost(newPost))
        return newPost
    }
}


export const postEdit = (post, post_id, image_id=null, formData=null, initialImage=false) => async dispatch => {
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
    })

    if(response.ok){
        const newPost = await response.json()
        if(formData && initialImage){
            const imageResponse = await fetch(`/api/posts/images/${image_id}`, {
                method: "PUT",
                body: formData
            })
            if(imageResponse.ok){
                const newImage = await imageResponse.json()
                newPost.images = [newImage]
                dispatch(update(newPost))
                return newPost
            }


            else return imageResponse
        }
        else if(formData && !initialImage){
            const imageResponse = await fetch(`/api/posts/${newPost.id}/images`, {
                method: "POST",
                body: formData
            })
                if(imageResponse.ok){
                    const newImage = await imageResponse.json()
                    newPost.images = [newImage]
                    dispatch(createPost(newPost))
                    return newPost
                }
        }
        dispatch(update(newPost))
        return newPost
    }
}


export const deletePost = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok){
        const deletedPost = await response.json()
        dispatch(remove(id))
        return deletedPost
    }
    return response
}

export const deletePostImage = (id) => async dispatch => {
    const response = await fetch(`/api/posts/images/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok){
        const deletedPostImage = await response.json()
        return deletedPostImage
    }
    return response
}

export const createLike = (payload, post) => async dispatch => {
console.log("payload in createLike", payload)
    const response = await fetch(`/api/posts/${post.id}/likes`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const {newPost, newLike} = await response.json()
        dispatch(update(newPost))
        return newLike
    }
}

export const updateLike = (payload, likeId, post, userId) => async dispatch => {

    const response = await fetch(`/api/posts/${post.id}/likes/${likeId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const {newPost, newLike} = await response.json()
        dispatch(update(newPost))
        return newLike
    }
}

export const deleteLike = (likeId, post, userId) => async dispatch => {
    console.log("likeId in thunk", likeId)
    const response = await fetch(`/api/posts/${post.id}/likes/${likeId}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok){
        const deletedLike = await response.json()
        post.likes.forEach(like=>{
            if(like.user_id===userId){
                let targetLikeIndex = post.likes.indexOf(like)
                post.likes.splice(targetLikeIndex,1)
            }
        })
        dispatch(update(post))
        return deletedLike
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
        case UPDATE: {
            newState = {...state, allPosts: {...state.allPosts} }
            console.log("action in reducer", action)
            newState.allPosts[action.post.id] = action.post
            newState.singlePost = action.post
            return newState
        }
        case DELETE: {
            newState = {...state, allPosts: {...state.allPosts}, singlePost:{...state.singlePost}}
            delete newState.allPosts[action.id]
            return newState
        }
        default:
            return state
    }
}

export default postReducer
