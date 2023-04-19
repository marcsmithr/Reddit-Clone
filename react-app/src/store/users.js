const LOAD = 'users/LOAD'
const UPDATE = 'users/UPDATE'
const DELETE = 'users/DELETE_USER'


const loadAll = users =>({
    type: LOAD,
    users
})

const remove = () => ({
    type: DELETE
  })

const update = community => ({
    type: UPDATE,
    community
})


export const allUsers = () => async dispatch => {
    const response = await fetch(`/api/users`)
    if(response.ok){
        const usersObj = await response.json()
        const users = usersObj.users
        dispatch(loadAll(users))
        return users
    }
}

export const updateUser = (user, id) => async dispatch => {

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })

    if(response.ok){
        await response.json()
        dispatch(update(user))
        return user
    }
}


export const deleteUser = (id) => async (dispatch) => {
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
        case UPDATE: {
            newState = {...state, allUsers: {...state.allUsers} }
            newState.allUsers[action.user.id] = action.user
            return newState
        }
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
