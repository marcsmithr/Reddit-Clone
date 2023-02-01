import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getOneCommunity, deleteCommunity } from "../../../store/communities";
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
    .then(()=> history.push('/') )
  };





  let ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button className="edit-community-button" onClick={openMenu}>
        Delete Community
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <div className="dropdown-menu">
            <div className="edit-community-modal">
                <div className="edit-community-modal-header">
                    <h2>Delete Community</h2>
                    <i className="fa-solid fa-x" onClick={closeMenu}></i>
                </div>
                <div className="community-form-header">
                    <h2>Warning</h2>
                    <span>Once deleted, a community is gone for good.</span>
                </div>
                <div>
                    <button on onClick={handleSubmit}>Delete</button>
                    <button onClick={closeMenu}>Cancel</button>
                </div>

            </div>
        </div>

      </ul>
    </div>
  );
}

export default DeleteCommunityButton;
