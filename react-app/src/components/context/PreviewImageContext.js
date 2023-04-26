import React, { useState, createContext } from 'react';

export const PreviewImageContext = createContext()

export const PreviewImageProvider = props => {
    const [preview, setPreview] = useState('')


    return(
        <PreviewImageContext.Provider value={{ preview, setPreview }} >
            {props.children}
        </PreviewImageContext.Provider>
    )

}
