import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if(password !== repeatPassword){
      setErrors(['Passwords must match'])
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <div className="login-form-header">
         <h2>Sign Up</h2>
      </div>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div className='errors' key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-input-container'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            maxLength="25"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="characters-remaining">
          <span>{`${25-username.length} characters remaining`}</span>
        </div>
        <div className='login-input-container' id='signup-email'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            maxLength="50"
            value={email}
          ></input>
        </div>
        <div className='login-input-container'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className='login-input-container'>
          <input
            type='password'
            name='repeat_password'
            placeholder='Repeat Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='login-form-button-container'>
          <button className='login-signup-form-button' type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
