const LOAD = 'posts/LOAD'



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


const initialState = {allCommunities: {}, singlePost: {}}
