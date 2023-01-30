import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import  {allPosts}  from './store/posts';
import SinglePostPage from './components/AllPosts/SinglePostPage';
import PostSplashPage from './components/AllPosts/PostSplashPage';
import CommunityPage from './components/Communities';
import CommunityPostPage from './components/Communities/CommunityPostPage';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { allCommunities } from './store/communities';
import AllPosts from './components/AllPosts';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(allPosts())
      await dispatch(allCommunities())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/login'>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute exact path='/users/:userId' >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <AllPosts/>
        </Route>
        <ProtectedRoute path='/submit' exact={true} >
          <PostSplashPage/>
        </ProtectedRoute>
        <Route path='/s/:community_name' exact={true}>
          <CommunityPage/>
        </Route>
        <ProtectedRoute path='/s/:community_name/submit' exact={true} >
          <CommunityPostPage/>
        </ProtectedRoute>
        <Route path='/s/:community_name/:post_id/comments' exact={true}>
          <SinglePostPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
