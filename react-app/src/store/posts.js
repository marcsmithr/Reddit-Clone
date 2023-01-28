const LOAD = 'posts/LOAD'
const CREATE = 'posts/CREATE'



const loadAll = posts => ({
    type: LOAD,
    posts
})

const createPost = post => ({
    type: CREATE,
    post
})




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
    console.log("COMMUNITY NAME", community_name)
    console.log("POST IN THUNK", post)
    const response = await fetch(`/api/communities/${community_name}/posts`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
      })

    if(response.ok){
        const newPost = await response.json()
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
        case CREATE:
            newState = {...state, allPosts: {...state.allPosts}, user: {...state.user}}
            newState.user[action.post.id] = action.review
            newState.allPosts[action.post.id] = action.post
            return newState
        default:
            return state
    }
}

export default postReducer
