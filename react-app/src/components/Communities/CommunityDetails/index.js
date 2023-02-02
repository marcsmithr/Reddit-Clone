import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoginModalContext } from '../../context/LoginModalContext'

import './index.css'

function CommunityDetails({community}){
    const currentUser = useSelector((state)=> state.session.user)
    const { showMenu, setShowMenu} = useContext(LoginModalContext)

    const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    };

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
                {currentUser &&
                <Link to={`/s/${community.name}/submit`}>
                    <button className='create-post-community-button'>Create Post</button>
                </Link>
                }
                {!currentUser &&
                    <button className='create-post-community-button' onClick={openMenu}>Create Post</button>
                }
            </div>
        </div>
    )
}

export default CommunityDetails
