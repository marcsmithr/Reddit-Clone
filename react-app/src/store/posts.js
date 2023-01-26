const LOAD = 'posts/LOAD'
const CREATE = 'posts/CREATE'



const loadAll = posts => ({
    type: LOAD,
    posts
})

const create = posts => ({
    type: CREATE,
    posts
})




export const allPosts = () => async dispatch => {
    const response = await fetch(`/api/post`)
    if(response.ok){
        const postsObj = await response.json()
        const posts = postsObj.Posts
        dispatch(loadAll(posts))
        return posts
    }
}

export const createPost = (payload) => async dispatch => {
    const {postPayload} = payload

    const postResponse = await fetch('/api/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postPayload)
    })
    if(postResponse.ok){
        const post = await postResponse.json()
        dispatch(create(post))
        return post
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
        case CREATE: {
            newState = {...state}
            let newAllPosts = {...state.allPosts, [action.post.id]: action.post}
            newState.allPosts = newAllPosts
            return newState
        }
        default:
            return state
    }
}

export default postReducer
