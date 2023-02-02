import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CreateCommunityButton from '../../Communities/CreateCommunity'
import { LoginModalContext } from '../../context/LoginModalContext'
import './index.css'

function CreatePostCommunity(){
    const currentUser = useSelector((state)=> state.session.user)
    const { showMenu, setShowMenu} = useContext(LoginModalContext)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };


    return (
        <div className="create-p-c-container">
            <div className="create-p-c-header">
                <img src="https://wpimg.pixelied.com/blog/wp-content/uploads/2021/08/03132815/relevant-elements-reddit-banner-size-1280x260.jpg" alt="create-banner"></img>
            </div>
            <div className="create-p-c-content-container">
                <div className='home-header'>
                    <div className='create-p-c-icon'>
                        <img src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c531.png' ></img>
                    </div>
                    <div className='home-span'>
                    <span>Home</span>
                    </div>
                </div>
                <div className='create-p-c-body'>
                    <span>Your personal Reddit frontpage. Come here to check in with your favorite communities.</span>
                </div>
            </div>
            <div className="create-p-c-button-container">
                {currentUser &&
                <Link to='/submit'>
                <button className='create-post-button'>Create Post</button>
                </Link>
                }
                {!currentUser &&
                <button className='create-post-button' onClick={openMenu}>Create Post</button>
                }
                <CreateCommunityButton/>
            </div>
        </div>
    )
}

export default CreatePostCommunity
