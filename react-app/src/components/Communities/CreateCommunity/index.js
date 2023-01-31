import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session'
import { NavLink, useHistory } from "react-router-dom";
import './index.css'

function CreateCommunityButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [communityName, setCommunityName] = useState('')
  const ulRef = useRef();
  const history = useHistory()

  const updateCommunityName = (e) => setCommunityName(e.target.value)

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
    updateCommunityName()
    dispatch(sessionActions.logout());
    setShowMenu(false)
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
                    <i class="fa-solid fa-x" onClick={closeMenu}></i>
                </div>
                <div className="community-form-header">
                    <h2>Name</h2>
                    <span>Community names including capitalization cannot be changed.</span>

                </div>
                <div>
                    <form>
                        <input
                        className='post-title'
                        type={'text'}
                        placeholder={'Community Name'}
                        required
                        value={communityName}
                        onChange={updateCommunityName}
                        maxLength="50"
                        >
                        </input>
                        <div className='community-submit-container'>
                            {(!communityName) &&
                                <button className='post-submit' disabled>Post</button>
                            }
                            {(communityName) &&
                            <button className='post-submit'>Post</button>
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
