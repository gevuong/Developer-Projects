import { combineReducers } from 'redux';
import thingsReducer from './things_reducer';

const rootReducer = combineReducers({
    things: thingsReducer,
})

export default rootReducer; 
