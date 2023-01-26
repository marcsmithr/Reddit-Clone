const LOAD = 'community/LOAD'



const loadAll = communities =>({
    type: LOAD,
    communities
})

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
        default:
            return state
    }
}

export default communityReducer
