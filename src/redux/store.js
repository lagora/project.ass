import {applyMiddleware, compose, createStore} from 'redux';
import throttleActions from 'redux-throttle-actions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';
import types from './types';

// const throttledActions = throttleActions([types.ttls.SET_CURSOR], 1000);

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = 
// composeEnhancers(
  applyMiddleware(
    // throttledActions, 
    thunk,
    // logger,
  // ),
  // other store enhancers if any
);
const store = createStore(reducer, enhancer);

export default store;