import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { allPosts } from "../../../store/posts";
import { deleteCommunity, allCommunities } from "../../../store/communities";
import './index.css'

function DeleteCommunityButton({ community }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()



  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(deleteCommunity(community.id))
    .then(()=> dispatch(allCommunities()) )
    .then(()=> dispatch(allPosts()) )
    .then(()=> history.push('/') )
  };





  let ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <div className="community-owner-crud">
        <button className="delete-community-button" onClick={openMenu}>
          Delete Community
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        <div className="dropdown-menu">
            <div className="delete-community-modal">
                <div className="delete-community-modal-header">
                    <h2>Delete Community</h2>
                    <div className="x-div">
                      <i className="fa-solid fa-x" onClick={closeMenu}></i>
                    </div>
                </div>
                <div className="community-form-header">
                    <h2>Warning</h2>
                    <span>Once deleted, a community is gone for good.</span>
                </div>
                <div>
                    <button onClick={handleSubmit} className="delete-button" >Delete</button>
                    <button onClick={closeMenu} className="cancel-button" >Cancel</button>
                </div>

            </div>
        </div>

      </ul>
    </div>
  );
}

export default DeleteCommunityButton;
