import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PostFormProvider } from './components/context/PostFormContext';
import { LoginModalProvider } from './components/context/LoginModalContext';
import { UserPageProvider } from './components/context/UserPageContext';
import { CommentFormProvider } from './components/context/CommentContext';
import { PreviewImageProvider } from './components/context/PreviewImageContext';
import './index.css';
import App from './App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <PreviewImageProvider>
      <PostFormProvider>
        <LoginModalProvider>
          <UserPageProvider>
            <CommentFormProvider>
              <Provider store={store}>
                <App />
              </Provider>
            </CommentFormProvider>
          </UserPageProvider>
          </LoginModalProvider>
        </PostFormProvider>
      </PreviewImageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
