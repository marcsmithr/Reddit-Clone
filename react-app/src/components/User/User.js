import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserCommunities from './UserCommunities';
import UserPosts from './UserPosts';
import { getUser } from '../../store/session';
import { UserPageContext } from '../context/UserPageContext';
import DeleteUserButton from './DeleteUser';
import EditUserButton from './EditUser';
import './User.css'

function User() {
    const dispatch = useDispatch()
    const { username }  = useParams();
    const user = useSelector((state)=>state.session.user)
    const allPosts = Object.values(useSelector((state)=> state.posts.allPosts))
    const posts = allPosts.filter(post => post.user.username===username)

    const { showCommunities, setShowCommunities, showPosts, setShowPosts } = useContext(UserPageContext)

    function postButtonUsers() {
        setShowCommunities(false)
        setShowPosts(true)
    }

    function communityButtonUsers() {
        setShowPosts(false)
        setShowCommunities(true)
    }

    let communityButtonId =  showCommunities ? "active" : ""
    let postButtonId = showPosts ? "active" : ""


    useEffect(()=>{
        dispatch(getUser(username))
    },[dispatch, username])

    if(!user.communities) return null
     return (
        <div>
            <div className='user-nav'>
                <div className='user-nav-buttons'>
                    <button onClick={ communityButtonUsers } id={communityButtonId} >Your Communities</button>
                    <button onClick={ postButtonUsers } id={postButtonId}>Posts</button>
                </div>
            </div>
            <div className='user-page-body'>
                <div className='user-page-content'>
                    <div className='left-main-user-div'>
                        {showCommunities&& (
                            <UserCommunities user={user}/>
                        )}
                        {showPosts && (
                            <UserPosts posts={posts}/>
                        )}
                    </div>
                    <div className='right-main-user-div'>
                    </div>
                </div>
            </div>
            <div>
                <ul className='user-info-ul'>
                    <li>
                        <strong>Username:</strong> {user.username}
                    </li>
                    <li>
                        <strong>Email:</strong> {user.email}
                    </li>
                </ul>
                <div className='user-profile-crud-container'>
                    {/* <div>
                        <EditUserButton user={user}/>
                    </div> */}
                    {/* <div>
                        <DeleteUserButton user={user}/>
                    </div> */}
                </div>
            </div>
        </div>
  );
}
export default User;
