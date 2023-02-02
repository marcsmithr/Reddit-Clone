import React, {useContext} from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { LoginModalContext } from '../context/LoginModalContext';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  const { setShowMenu, setShowLogin } = useContext(LoginModalContext)
  
  return (
    <Route {...props}>
      {(user)? props.children  : setShowMenu(true)}
    </Route>
  )
};


export default ProtectedRoute;
