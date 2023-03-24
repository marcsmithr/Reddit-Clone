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
        console.log("likesObj", likesObj)
        const likes = likesObj.likes
        console.log("likes in thunk", likes)
        dispatch(loadAll(likes))
        return likes
    }
}

// export const createLike = (payload, id) => async dispatch => {

//     const response = await fetch(`/api/posts/${id}/likes`, {
//         method: 'POST',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(payload)
//     })

//     if(response.ok){
//         const createdLike = await response.json()
//         dispatch(create(createdLike))
//         return createdLike
//     }
// }

// export const updateLike = (payload, id) => async dispatch => {

//     const response = await fetch(`/api/posts/likes/${id}`, {
//         method: 'PUT',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(payload)
//     })

//     if(response.ok){
//         const newLike = await response.json()
//         dispatch(update(newLike))
//         return newLike
//     }
// }

// export const deleteLike = (id) => async dispatch => {
//     // console.log('PARAMS IN THUNK', params)
//     const response = await fetch(`/api/posts/likes/${id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//     })
//     if (response.ok){
//         const deletedLike = await response.json()
//         dispatch(remove(id))
//         return deletedLike
//     }
//     return response
// }


const initialState = {allLikes: {}, singleLike: {}}

const likeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case LOAD: {
            newState = {...state, allLikes: {...state.allLikes}, singleLike:{...state.singleLike}}
            let like2={}
            console.log("likes in reducer", action.likes)
            action.likes.forEach(like => {
                like2[like.id] = like
            });
            newState.allLikes = like2
            return newState
        }
        // case GET_ONE: {
        //     newState = {
        //         ...state,
        //         allLikes: {...state.allLikes},
        //         singleLike: {}
        //     }
        //     newState.singleLike = action.like
        //     return newState
        // }
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
