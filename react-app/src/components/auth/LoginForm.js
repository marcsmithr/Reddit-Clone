import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    if(user)
    history.push('/')
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUser = async (e) => {
    e.preventDefault();
    let demoEmail = 'demo@aa.io'
    let demoPw = 'password'
    const demo = await dispatch(login(demoEmail, demoPw))
    if (demo) {
      setErrors(demo);
    }
  }


  return (
    <div>
            <div className="login-form-header">
                    <h2>Log In</h2>
            </div>
            <form onSubmit={onLogin}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div className='login-input-container'>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className='login-input-container'>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
                <div className='login-form-buttons'>
                  <div className='login-form-button-container'>
                    <button type='submit' className='login-signup-form-button'>Login</button>
                  </div>
                  <div className='login-form-button-container'>
                    <button className='login-signup-form-button' onClick={demoUser}>Demo</button>
                  </div>
                </div>
              </div>
            </form>
    </div>
  );
};

export default LoginForm;
