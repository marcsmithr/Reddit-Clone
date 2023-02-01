const LOAD = 'communities/LOAD'
const CREATE = 'communities/CREATE'
const GET_ONE = 'communities/GET_ONE'



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



export const getOneCommunity = (id) => async dispatch => {
    const response = await fetch(`/api/communities/${id}`);
    if (response.ok){
        const communityObj = await response.json();
        const community = communityObj.Community
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
        default:
            return state
    }
}

export default communityReducer
