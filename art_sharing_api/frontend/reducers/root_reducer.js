import { combineReducers } from 'redux';
import campgrounds from './things_reducer';

const rootReducer = combineReducers({
    campgrounds, // syntactic sugar for campgrounds: campgroundsReducer
});

export default rootReducer;
