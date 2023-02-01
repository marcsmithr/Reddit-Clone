import { Link } from 'react-router-dom'
import './index.css'

function CommunityDetails({community}){

    return (
        <div className="community-page-details-container">
            <div className="community-page-details-header">
                <span>About Community</span>
            </div>
            <div className="community-page-details-details">
                <div className="community-page-details-decription">
                    <span>{community.description}</span>
                </div>
            </div>
            <div className="community-page-details-post-button-container">
            <Link to={`/s/${community.name}/submit`}>
                <button className='create-post-community-button'>Create Post</button>
                </Link>
            </div>
        </div>
    )
}

export default CommunityDetails
