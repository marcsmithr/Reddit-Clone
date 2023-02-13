const LOAD = 'users/LOAD'
const DELETE = 'users/DELETE_USER'


const loadAll = users =>({
    type: LOAD,
    users
})

const remove = () => ({
    type: DELETE
  })



export const allUsers = () => async dispatch => {
    // console.log("HELLO FROM ALLUsers")
    const response = await fetch(`/api/users`)
    // console.log("RESPONSE FROM ALLUsers", response)
    if(response.ok){
        const usersObj = await response.json()
        // console.log('USERSOBJ', usersObj)
        const users = usersObj.users
        dispatch(loadAll(users))
        return users
    }
}


export const deleteUser = (id) => async (dispatch) => {
    console.log("ID IN THUNK", id)
    const response = await fetch (`/api/users/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
  })
    if (response.ok){
      const deletedUser = await response.json()
          dispatch(remove(id))
          return deletedUser
    }
  }


const initialState = {allUsers: {}, singleUser: {}}


const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case LOAD: {
            newState = {...state, allUsers: {...state.allUsers}, singleUser:{...state.singleUser}}
            let user2={}
            console.log('USERS IN REDUCER', action.users)
            action.users.forEach(user => {
                user2[user.id] = user
            });
            newState.allUsers = user2
            return newState
        }
        // case GET_ONE: {
        //     newState = {
        //         ...state,
        //         allCommunities: {...state.allCommunities},
        //         singleCommunity: {}
        //     }
        //     newState.singleCommunity = action.community
        //     return newState
        // }
        // case CREATE: {
        //     newState = {...state}
        //     let newAllCommunities = {...state.allCommunities, [action.community.id]: action.community}
        //     newState.allCommunities = newAllCommunities
        //     return newState
        // }
        // case UPDATE: {
        //     newState = {...state, allCommunities: {...state.allCommunities} }
        //     newState.allCommunities[action.community.id] = action.community
        //     return newState
        // }
        case DELETE: {
            newState = {...state, allUsers: {...state.allUsers}, singleUser:{...state.singleUser}}
            delete newState.allUsers[action.id]
            return newState
        }
        default:
            return state
    }
}

export default userReducer
