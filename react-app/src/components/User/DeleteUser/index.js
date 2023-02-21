import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { allCommunities } from "../../../store/communities";
import { allPosts } from "../../../store/posts";
import { deleteUser, allUsers } from "../../../store/users";
import './index.css'

function DeleteUserButton({ user }) {
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

    dispatch(deleteUser(user.id))
    .then(()=> dispatch(allUsers()))
    .then(()=> dispatch(allCommunities()))
    .then(()=> dispatch(allPosts()))
    .then(()=> history.push('/') )
  };





  let ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <div className="user-owner-crud">
        <button className="delete-user-button" onClick={openMenu}>
          Delete User
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        <div className="delete-user-dropdown-menu">
            <div className="delete-user-modal">
                <div className="delete-user-modal-header">
                    <h2>Delete User</h2>
                    <div className="x-div">
                      <i className="fa-solid fa-x" onClick={closeMenu}></i>
                    </div>
                </div>
                <div className="delete-user-form-header">
                    <h2>Warning</h2>
                    <span>Once deleted, a user is gone for good.</span>
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

export default DeleteUserButton;
