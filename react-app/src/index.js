import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PostFormProvider } from './components/context/PostFormContext';
import './index.css';
import App from './App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <PostFormProvider>
      <Provider store={store}>
          <App />
        </Provider>
      </PostFormProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
