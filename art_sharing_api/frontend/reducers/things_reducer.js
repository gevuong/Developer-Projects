import merge from 'lodash/merge';
import { RECEIVE_ALL_CAMPGROUNDS } from '../actions/thing_actions';

// const defaultState = Object.freeze({
//     campgrounds: [],
// });
// reducer must never mutate previus state. Instead, return a new array or object with the necessary changes.
const campgroundsReducer = (state = {}, action) => {
    Object.freeze(state);
    console.log("action: ", action);
    switch(action.type) {
        case RECEIVE_ALL_CAMPGROUNDS:
            const campgrounds = action.campgrounds;
            return merge({}, state, campgrounds);
        default:
            console.log("return default state");
            return state;
    }
}

export default campgroundsReducer;
