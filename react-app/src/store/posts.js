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
    // console.log("COMMUNITY NAME IN CREATE POST", community_name)
    // console.log("POST IN CREATE POST", post)

    const response = await fetch(`/api/communities/${community_name}/posts`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
      })
    //   console.log("RESPONSE IN CREATE POST", response)
    if(response.ok){
        const newPost = await response.json()
        // console.log("NEWPOST IN CREATE POST", newPost)
        if(formData){

            console.log("FORMDATA IN THUNK", formData)
            const imageResponse = await fetch(`/api/posts/${newPost.id}/images`, {
                method: "POST",
                body: formData
            })
            console.log("IMAGERESPONSE", imageResponse)
            if(imageResponse.ok){
                const newImage = await imageResponse.json()
                console.log("newImage IN THUNK", newImage)
                newPost.images = [newImage]
                dispatch(createPost(newPost))
                return newPost
            }
        }
        dispatch(createPost(newPost))
        return newPost
    }
}

export const postEdit = (post, post_id, image_id=null, formData=null) => async dispatch => {
    console.log('Post IN THE THUNK ', post)
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
    })
    console.log("RESPONSE IN THE THUNK", response)

    if(response.ok){
        const newPost = await response.json()
        console.log("NEWPOST IN EDIT POST", newPost)
        if(formData){
            console.log("Hello from EDIT POST", image_id)
            const imageResponse = await fetch(`/api/posts/images/${image_id}`, {
                method: "PUT",
                body: formData
            })
            console.log("imageResponse---", imageResponse)
            if(imageResponse.ok){
                const newImage = await imageResponse.json()
                console.log("newImage IN THUNK", newImage)
                newPost.images = [newImage]
                dispatch(update(newPost))
                return newPost
            }
            else return imageResponse
        }
        dispatch(update(newPost))
        return newPost
    }
}


export const deletePost = (id) => async dispatch => {
    console.log('id IN DELETE THUNK', id)
    const response = await fetch(`/api/posts/${id}`, {
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

export const deletePostImage = (id) => async dispatch => {
    console.log('id IN DELETE THUNK', id)
    const response = await fetch(`/api/posts/images/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    console.log('REPONSE----', response)
    if (response.ok){
        const deletedPostImage = await response.json()
        return deletedPostImage
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
            newState.allPosts[action.post.id] = action.post
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
