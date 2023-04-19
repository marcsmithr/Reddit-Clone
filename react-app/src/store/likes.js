const LOAD = 'likes/LOAD'
const CREATE = 'likes/CREATE'
const UPDATE = 'likes/UPDATE'
// const GET_ONE = 'likes/GET_ONE'
const DELETE = 'likes/DELETE'


const loadAll = likes => ({
    type: LOAD,
    likes
})

// const getOne = post => ({
//     type: GET_ONE,
//     post
// })


const create = like => ({
    type: CREATE,
    like
})

const update = like => ({
    type: UPDATE,
    like
})

const remove = id => ({
    type: DELETE,
    id
})

export const loadAllLikes = (id)=> async dispatch =>{
    const response = await fetch(`/api/posts/${id}/likes`)
    if(response.ok){
        const likesObj = await response.json()
        const likes = likesObj.likes
        dispatch(loadAll(likes))
        return likes
    }
}




const initialState = {allLikes: {}, singleLike: {}}

const likeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case LOAD: {
            newState = {...state, allLikes: {...state.allLikes}, singleLike:{...state.singleLike}}
            let like2={}
            action.likes.forEach(like => {
                like2[like.id] = like
            });
            newState.allLikes = like2
            return newState
        }
        case CREATE: {
            newState = {...state}
            let newAllLikes = {...state.allLikes, [action.like.id]: action.like}
            newState.allLikes = newAllLikes
            return newState
        }
        case UPDATE: {
            newState = {...state, allLikes: {...state.allLikes} }
            newState.allLikes[action.like.id] = action.like
            return newState
        }
        case DELETE: {
            newState = {...state, allLikes: {...state.allLikes}, singleLike:{...state.singleLike}}
            delete newState.allLikes[action.id]
            return newState
        }
        default:
            return state
    }
}

export default likeReducer
