import { combineReducers } from 'redux';
import things from './things_reducer';

const rootReducer = combineReducers({
    things,
});

export default rootReducer;
