import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import commentReducer from './comments';
import postReducer from './posts';
import communityReducer from './communities';
import userReducer from './users';
import likeReducer from './likes';

const rootReducer = combineReducers({
  session,
  comments: commentReducer,
  posts: postReducer,
  communities: communityReducer,
  users: userReducer,
  likes: likeReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
