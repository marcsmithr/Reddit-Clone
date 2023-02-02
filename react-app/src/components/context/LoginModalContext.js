import React, { useState, createContext } from 'react';

export const LoginModalContext = createContext()

export const LoginModalProvider = props => {
    const [showMenu, setShowMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(true)


    return(
        <LoginModalContext.Provider value={{ showMenu, setShowMenu, showLogin, setShowLogin }} >
            {props.children}
        </LoginModalContext.Provider>
    )

}
