const LOAD = 'community/LOAD'
const GET_ONE = 'community/GET_ONE'



const getOne = community => ({
    type: GET_ONE,
    community
})

const loadAll = communities =>({
    type: LOAD,
    communities
})



export const getOneCommunity = (name) => async dispatch =>{
    console.log('NAME IN THUNK', name)
    const response = await fetch(`/api/community/${name}`);
    console.log('RESPONSE IN THUNK', response)
    if(response.ok){
        const communityObj = await response.json();
        const community = communityObj.Community
        dispatch(getOne(community))
        return community
    }
    return response
}


export const allCommunities = () => async dispatch => {
    const response = await fetch(`/api/community`)

    if(response.ok){
        const communitiesObj = await response.json()
        const communities = communitiesObj.Communities
        dispatch(loadAll(communities))
        return communities
    }
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
        case GET_ONE:{
            newState = {
                ...state,
                allCommunities: {...state.allCommunities},
                singleCommunity: {}
            }
            newState.singleCommunity = action.community
            return newState
        }
        default:
            return state
    }
}

export default communityReducer
