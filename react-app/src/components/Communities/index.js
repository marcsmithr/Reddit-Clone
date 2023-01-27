import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { getOneCommunity } from '../../store/communities';

const CommunityPage = () => {
    const dispatch = useDispatch()
    const {community_name} = useParams()
    console.log('COMMUNITY NAME IN COMMUNITY PAGE', community_name)

    useEffect(()=>{
        dispatch(getOneCommunity(community_name))
    }, [dispatch, community_name])


    return(
        <span> Hello</span>
    )




}

export default CommunityPage
