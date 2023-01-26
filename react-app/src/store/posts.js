const LOAD = 'posts/LOAD'



const loadAll = posts => ({
    type: LOAD,
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
        default:
            return state
    }
}

export default postReducer
