import React, { useContext, useRef, useState } from "react";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import { LoginModalContext } from "../context/LoginModalContext";
import './LoginSignupModal.css'


function LoginSignupModal(){
    const { showMenu, setShowMenu, showLogin, setShowLogin } = useContext(LoginModalContext)
    const ulRef = useRef();
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

      const closeMenu = () => {
        
        setShowMenu(false);
      };

      const loginScreen = () => {
        if (showLogin) return;
        setShowLogin(true);
      };

      const signupScreen = () => {
        setShowLogin(false);
      };

    let ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return(
        <div>
      <button className='login-button' onClick={openMenu}>
        Log In
      </button>
      <ul className={ulClassName}  ref={ulRef}>
        <div className='dropdown-menu'>
            <div className="login-signup-modal">
                <div>
                    <i className="fa-solid fa-x" onClick={closeMenu}></i>
                </div>
            {showLogin===true &&
            <div>
                <LoginForm/>
                <div className="login-switch-forms">
                    <span>New to Seddit?</span>
                    <span onClick={signupScreen} className="link">Sign Up</span>
                </div>
            </div>
            }
            {showLogin===false &&
            <div>
                <SignUpForm/>
                <div className="signup-switch-forms">
                    <span>Already a Sedditor?</span>
                    <span onClick={loginScreen} className="link">Log In</span>
                </div>
            </div>
            }
            </div>
        </div>
      </ul>
    </div>
    )
}

export default LoginSignupModal
