import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PostFormProvider } from './components/context/PostFormContext';
import { LoginModalProvider } from './components/context/LoginModalContext';
import './index.css';
import App from './App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <PostFormProvider>
      <LoginModalProvider>
      <Provider store={store}>
          <App />
        </Provider>
        </LoginModalProvider>
      </PostFormProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
