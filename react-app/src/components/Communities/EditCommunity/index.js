import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session'
import { NavLink, useHistory } from "react-router-dom";
import { getOneCommunity, updateCommunity, allCommunities } from "../../../store/communities";
import './index.css'

function EditCommunityButton({ community }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [communityName, setCommunityName] = useState(community.name)
  const [communityTitle, setCommunityTitle] = useState(community.title)
  const [description, setDescription] = useState(community.description)
  const [communityImage, setCommunityImage] = useState(community.community_image)
  const [communityBanner, setCommunityBanner] = useState(community.community_banner)
  const ulRef = useRef();

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

  // useEffect(() => {
  //   if (!showMenu) return;

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      id:community.id,
      name: communityName,
      title: communityTitle,
      description: description,
      community_image: 'https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png',
      community_banner: 'https://i.redd.it/sgf6r5easbh31.jpg'
    }
    if(communityImage){
      payload.community_image = communityImage
    }
    if(communityBanner){
      payload.community_banner = communityBanner
    }
    dispatch(updateCommunity(payload, community.id))
    .then((res)=> community = res)
    .then(()=> dispatch(allCommunities()))
    .then(() => dispatch(getOneCommunity(community.name)))
    .then(closeMenu())
  };





  let ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <div className="community-owner-crud">
        <button className="edit-community-button" onClick={openMenu}>
          Edit Community
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        <div className="dropdown-menu">
            <div className="edit-community-modal">
                <div className="edit-community-modal-header">
                    <h2>Edit Community</h2>
                    <i className="fa-solid fa-x" onClick={closeMenu}></i>
                </div>
                <div className="community-form-header">
                    <h2>Name</h2>
                    <span>Community names including capitalization cannot be changed.</span>

                </div>
                <div>
                    <form className="edit-community-form" onSubmit={handleSubmit}>
                        <div className="form-input">
                          <input
                          className='community-form-name'
                          type={'text'}
                          placeholder={'Community Name'}
                          required
                          value={communityName}
                          onChange={updateCommunityName}
                          maxLength="25"
                          />
                        </div>
                        <div className="form-input">
                          <input
                          className='community-form-title'
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
                              className='community-form-description'
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
                          className='community-form-image'
                          type='url'
                          placeholder={'Community Icon (optional)'}
                          value={communityImage}
                          onChange={updateCommunityImage}
                          />
                        </div>
                        <div className="form-input">
                          <input
                          className='community-form-banner'
                          type='url'
                          placeholder={'Community Banner (optional)'}
                          value={communityBanner}
                          onChange={updateCommunityBanner}
                          />
                        </div>
                        <div className='community-submit-container'>
                            {(!communityName) &&
                                <button className='post-submit' disabled>Edit</button>
                            }
                            {(communityName) &&
                            <button className='post-submit'>Edit</button>
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

export default EditCommunityButton;
