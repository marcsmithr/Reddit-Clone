import React, { useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { LoginModalContext } from "../../context/LoginModalContext";
import { createCommunity } from "../../../store/communities";
import './index.css'

function CreateCommunityButton({ user }) {
  const dispatch = useDispatch();
  const [showCreateCom, setShowCreateCom] = useState(false);
  const [communityName, setCommunityName] = useState('')
  const [communityTitle, setCommunityTitle] = useState('')
  const [description, setDescription] = useState('')
  const [communityImage, setCommunityImage] = useState('')
  const [communityBanner, setCommunityBanner] = useState('')
  const ulRef = useRef();
  const history = useHistory()

  const { showMenu, setShowMenu } = useContext(LoginModalContext)

  const currentUser = useSelector((state)=> state.session.user)

  const updateCommunityName = (e) => setCommunityName(e.target.value)
  const updateCommunityTitle = (e) => setCommunityTitle(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updateCommunityImage = (e) => setCommunityImage(e.target.value)
  const updateCommunityBanner = (e) => setCommunityBanner(e.target.value)

  const openCreateCom = () => {
    if (showCreateCom) return;
    setShowCreateCom(true);
  };

  const closeCreateCom = () => {
    setShowCreateCom(false);
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      name: communityName,
      title: communityTitle,
      description: communityTitle,
      community_image: 'https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png',
      community_banner: 'https://i.redd.it/sgf6r5easbh31.jpg'
    }
    if(communityImage){
      payload.community_image = communityImage
    }
    if(communityBanner){
      payload.community_banner = communityBanner
    }
    let newCommunityName
    dispatch(createCommunity(payload))
    .then((res)=> newCommunityName = res.name)
    .then(() => history.push(`/s/${newCommunityName}`))
  };

  let ulClassName = "profile-dropdown" + (showCreateCom ? "" : " hidden");

  return (
    <div>
      {currentUser&&
      <button className="create-community-button" onClick={openCreateCom}>
        Create Community
      </button>
      }
      {!currentUser&&
      <button className="create-community-button" onClick={openMenu}>
        Create Community
      </button>
      }
      <ul className={ulClassName} ref={ulRef}>
        <div className="dropdown-menu">
            <div className="create-community-modal">
                <div className="create-community-modal-header">
                    <h2>Create a community</h2>
                    <i className="fa-solid fa-x" onClick={closeCreateCom}></i>
                </div>
                <div className="community-form-header">
                    <h2>Name</h2>
                    <span>Community names including capitalization cannot be changed.</span>

                </div>
                <div>
                    <form className="create-community-form" onSubmit={handleSubmit}>
                      <div className="form-input">
                        <input
                        className='community-form-name margin-t-10 create-form-child'
                        type={'text'}
                        placeholder={'Community Name'}
                        required
                        value={communityName}
                        onChange={updateCommunityName}
                        maxLength="25"
                        />
                        </div>
                        <div className="form-input" id="create-community-span">
                          <span className="margin-t-10">{`${25-communityName.length} characters remaining`}</span>
                        </div>
                        <div className="form-input">
                        <input
                        id='community-form-title'
                        type={'text'}
                        placeholder={'Community Title'}
                        required
                        value={communityTitle}
                        onChange={updateCommunityTitle}
                        maxLength="50"
                        />
                        </div>
                        <div className="form-textarea">
                        <textarea
                            className='community-form-description create-form-child'
                            type={'text'}
                            placeholder={'Decription'}
                            value={description}
                            onChange={updateDescription}
                            maxLength="500"
                            required
                        />
                        </div>
                        <div className="form-input">
                        <input
                        className='community-form-image create-form-child'
                        type='url'
                        placeholder={'Community Icon (optional)'}
                        value={communityImage}
                        onChange={updateCommunityImage}
                        />
                        </div>
                        <div className="form-input">
                        <input
                        className='community-form-banner create-form-child'
                        type='url'
                        placeholder={'Community Banner (optional)'}
                        value={communityBanner}
                        onChange={updateCommunityBanner}
                        />
                        </div>
                        <div className='community-submit-container margin-t-10'>
                            {(!communityName) &&
                                <button className='post-submit' disabled>Create</button>
                            }
                            {(communityName) &&
                            <button className='post-submit'>Create</button>
                            }
                        </div>
                    </form>

                </div>

            </div>
        </div>

      </ul>
    </div>
  );
}

export default CreateCommunityButton;
