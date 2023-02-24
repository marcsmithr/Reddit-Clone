import React from 'react'
import { Link } from 'react-router-dom'

function CommunityCard({community}){
    return(
        <>
        <Link className='community-card-link' to={`/s/${community.name}`}>
            <div className="community-card-container">
                <div className='community-info-container'>
                    <div className='community-card-community-image-container'>
                        <img src={community.community_image} alt={`${community.name} community image`} />
                    </div>
                    <div className='community-card-community-header-container'>
                            <span className='community-card-community-header'>s/{community.name}</span>
                    </div>
                </div>
            </div>
        </Link>
        </>
    )
}

export default CommunityCard
