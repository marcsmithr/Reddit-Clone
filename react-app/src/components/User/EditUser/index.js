import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session'
import { NavLink, useHistory } from "react-router-dom";
import { allCommunities } from "../../../store/communities";
import { allUsers, updateUser } from "../../../store/users";
import { allPosts } from "../../../store/posts";
import './index.css'

function EditUserButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const ulRef = useRef();

  const updateUsername = (e) => {setUsername(e.target.value)};
  const updateEmail = (e) => {setEmail(e.target.value)};
  const updatePassword = (e) => {setPassword(e.target.value)};
  const updateRepeatPassword = (e) => {setRepeatPassword(e.target.value)};

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
        username,
        email,
        password
    }
    if(password !== repeatPassword){
        setErrors(['Passwords must match'])
      }
      if (password === repeatPassword) {
        const data = dispatch(updateUser(payload))
        .then(()=> dispatch(allUsers()))
        .then(()=> dispatch(sessionActions.getUser(user.id)))
        .then(()=> dispatch(allCommunities()))
        .then(()=> dispatch(allPosts()))
        if (data) {
          setErrors(data)
        }
      }
  };





  let ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <div className="user-owner-crud">
        <button className="edit-user-button" onClick={openMenu}>
          Edit User
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        <div className="edit-user-dropdown-menu">
            <div className="edit-user-modal">
                <div className="edit-user-modal-header">
                    <h2>Edit User</h2>
                    <i className="fa-solid fa-x" onClick={closeMenu}></i>
                </div>
                <div>
                <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div className='errors' key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-input-container'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            maxLength="25"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="characters-remaining">
          <span>{`${25-username.length} characters remaining`}</span>
        </div>
        <div className='login-input-container' id='signup-email'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            maxLength="50"
            value={email}
          ></input>
        </div>
        <div className='login-input-container'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className='login-input-container'>
          <input
            type='password'
            name='repeat_password'
            placeholder='Repeat Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='login-form-button-container'>
          <button className='login-signup-form-button' type='submit'>Submit</button>
        </div>
      </form>

                </div>

            </div>
        </div>

      </ul>
    </div>
  );
}

export default EditUserButton;
