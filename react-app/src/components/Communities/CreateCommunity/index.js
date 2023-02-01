import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session'
import { NavLink, useHistory } from "react-router-dom";
import { createCommunity } from "../../../store/communities";
import './index.css'

function CreateCommunityButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [communityName, setCommunityName] = useState('')
  const [communityTitle, setCommunityTitle] = useState('')
  const [description, setDescription] = useState('')
  const [communityImage, setCommunityImage] = useState('')
  const [communityBanner, setCommunityBanner] = useState('')
  const ulRef = useRef();
  const history = useHistory()

  const updateCommunityName = (e) => setCommunityName(e.target.value)
  const updateCommunityTitle = (e) => setCommunityTitle(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updateCommunityImage = (e) => setCommunityImage(e.target.value)
  const updateCommunityBanner = (e) => setCommunityBanner(e.target.value)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

//   useEffect(() => {
//     if (!showMenu) return;

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

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
    dispatch(createCommunity(payload))
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button className="create-community-button" onClick={openMenu}>
        Create Community
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <div className="dropdown-menu">
            <div className="create-community-modal">
                <div className="create-community-modal-header">
                    <h2>Create a community</h2>
                    <i className="fa-solid fa-x" onClick={closeMenu}></i>
                </div>
                <div className="community-form-header">
                    <h2>Name</h2>
                    <span>Community names including capitalization cannot be changed.</span>

                </div>
                <div>
                    <form className="create-community-form" onSubmit={handleSubmit}>
                        <input
                        className='community-form-name'
                        type={'text'}
                        placeholder={'Community Name'}
                        required
                        value={communityName}
                        onChange={updateCommunityName}
                        maxLength="25"
                        />
                        <input
                        className='community-form-title'
                        type={'text'}
                        placeholder={'Community Title'}
                        required
                        value={communityTitle}
                        onChange={updateCommunityTitle}
                        maxLength="50"
                        />

                        <textarea
                            className='community-form-description'
                            type={'text'}
                            placeholder={'Decription'}
                            value={description}
                            onChange={updateDescription}
                            maxLength="1000"
                            required
                        />
                        <input
                        className='community-form-image'
                        type='url'
                        placeholder={'Community Icon (optional)'}
                        value={communityImage}
                        onChange={updateCommunityImage}
                        />
                        <input
                        className='community-form-banner'
                        type='url'
                        placeholder={'Community Banner (optional)'}
                        value={communityBanner}
                        onChange={updateCommunityBanner}
                        />
                        <div className='community-submit-container'>
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
