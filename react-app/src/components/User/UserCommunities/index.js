import React from 'react'
import CommunityCard from "../CommunityCard"

function UserCommunities({user}){
    const communities = Object.values(user.communities)


    if(communities.length===0){
        return(
            <h1>
                {'No Communities Yet :('}
            </h1>
        )
    }
    return(
        <div className="community-cards-container">
            {communities.map((community)=>(
                    <CommunityCard
                    community={community}
                    key={community.id}
                    />
            ))}

        </div>
    )
}

export default UserCommunities
