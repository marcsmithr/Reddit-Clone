import React, { useState, createContext } from 'react';

export const UserPageContext = createContext()

export const UserPageProvider = props => {
    const [showCommunities, setShowCommunities] = useState(true);
    const [showPosts, setShowPosts] = useState(false)


    return(
        <UserPageContext.Provider value={{ showCommunities, setShowCommunities, showPosts, setShowPosts }} >
            {props.children}
        </UserPageContext.Provider>
    )

}
