import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginSignupModal from './LoginSignupModal';
// import * as sessionActions from '../../store/session';
// import { useHistory } from "react-router-dom";
import ProfileButton from './ProfileButton';

import './index.css'

const Navigation = ({ loaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  // const history = useHistory()
  // const dispatch = useDispatch()
  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  //   history.push('/')
  // };


  return (
    <div className='nav-container'>
      <div id='upper-navigation'>
        <div className='upper-left-home'>
          <NavLink exact to="/">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Reddit_logo_new.svg/2560px-Reddit_logo_new.svg.png' className='web-icon' alt='icon'/>
          </NavLink>
        </div>
        <div className='upper-right-buttons'>
            {/* <NavLink exact to="/writeareview">WRITE A REVIEW</NavLink> */}
            {!sessionUser && (
            <div className='nav-buttons-container'>
              {/* <div className='nav-button'>
                <NavLink exact to="/sign-up">
                  <button className='signup-button'>
                    Sign Up
                  </button>
                </NavLink>
                </div> */}
              <div className='nav-button'>
                  <LoginSignupModal/>
              </div>
              </div>
            )}
            {sessionUser && (
              <div className='nav-buttons-container'>
              <ProfileButton user={sessionUser} />
            </div>
            )}

        </div>
      </div>
      {/* <div>
        <LowerNav />
      </div> */}
    </div>
  );
}

export default Navigation;
