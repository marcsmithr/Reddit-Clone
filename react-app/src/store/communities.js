const LOAD = 'communities/LOAD'
const CREATE = 'communities/CREATE'
const UPDATE = 'communities/UPDATE'
const GET_ONE = 'communities/GET_ONE'
const DELETE = 'communities/DELETE'



const loadAll = communities =>({
    type: LOAD,
    communities
})

const create = community => ({
    type: CREATE,
    community
})

const getOne = community => ({
    type: GET_ONE,
    community
})

const update = community => ({
    type: UPDATE,
    community
})

const remove = id => ({
    type: DELETE,
    id
})


export const getOneCommunity = (community_name) => async dispatch => {
    // console.log("COMMUNITY NAME IN THUNK", community_name)
    const response = await fetch(`/api/communities/${community_name}`);
    // console.log("RESPONSE IN THUNK", response)
    if (response.ok){
        const communityObj = await response.json();
        // console.log("COMMUNITYOBJ IN THUNK", communityObj)
        const community = communityObj.Community
        // console.log("COMMUNITY IN THUNK", community)
        dispatch(getOne(community))
        return community
    }
    return response
}


export const allCommunities = () => async dispatch => {
    const response = await fetch(`/api/communities`)

    if(response.ok){
        const communitiesObj = await response.json()
        const communities = communitiesObj.Communities
        dispatch(loadAll(communities))
        return communities
    }
}

export const createCommunity = (newCommunity) => async dispatch =>{
    const response = await fetch(`/api/communities/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCommunity)
    })
    if(response.ok){
        const createdCommunity = await response.json()
        await dispatch(create(createdCommunity))
        return createdCommunity
    }
    return response
}

export const updateCommunity = (community, id) => async dispatch => {

    const response = await fetch(`/api/communities/${id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(community)
    })

    if(response.ok){
        await response.json()
        dispatch(update(community))
        return community
    }
}

export const deleteCommunity = (id) => async dispatch => {
    // console.log('PARAMS IN THUNK', params)
    const response = await fetch(`/api/communities/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok){
        const deletedCommunity = await response.json()
        dispatch(remove(id))
        return deletedCommunity
    }
    return response
}




const initialState = {allCommunities: {}, singleCommunity: {}}

const communityReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case LOAD: {
            newState = {...state, allCommunities: {...state.allCommunities}, singleCommunity:{...state.singleCommunity}}
            let community2={}
            action.communities.forEach(community => {
                community2[community.id] = community
            });
            newState.allCommunities = community2
            return newState
        }
        case GET_ONE: {
            newState = {
                ...state,
                allCommunities: {...state.allCommunities},
                singleCommunity: {}
            }
            newState.singleCommunity = action.community
            return newState
        }
        case CREATE: {
            newState = {...state}
            let newAllCommunities = {...state.allCommunities, [action.community.id]: action.community}
            newState.allCommunities = newAllCommunities
            return newState
        }
        case UPDATE: {
            newState = {...state, allCommunities: {...state.allCommunities} }
            newState.allCommunities[action.community.id] = action.community
            return newState
        }
        case DELETE: {
            newState = {...state, allCommunities: {...state.allCommunities}, singleCommunity:{...state.singleCommunity}}
            delete newState.allCommunities[action.id]
            return newState
        }
        default:
            return state
    }
}

export default communityReducer
