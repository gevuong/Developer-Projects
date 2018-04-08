import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// A thunk is a function that returns a function. Use a thunk when you need to start an asynchronous action, such as an API call, or a router transition.

// configureStore is used to apply preloadedState and middleware
const configureStore = () => (
    createStore(rootReducer, applyMiddleware(thunk, logger))
);

export default configureStore;
