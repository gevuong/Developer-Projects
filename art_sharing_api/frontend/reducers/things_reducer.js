import merge from 'lodash/merge';

import { RECEIVE_FETCHED_THINGS, RECEIVE_SEARCHED_THINGS } from '../actions/thing_actions';

// temporary for testing Redux cycle
// const NAMES = [
//     "Steve",
//     "ridge",
//     "wood",
//     "vineyard",
//     "woodbridge",
//     "coffee",
//     "content",
//     "bridge",
//     "capital",
//     "socks",
//     "stable",
//     "corn",
//     "David",
//     "services",
// ]

// const defaultState = Object.freeze({
//     things: [],
// });
// reducer must never mutate previus state. Instead, return a new array or object with the necessary changes.

const thingsReducer = (state = {}, action) => {
    Object.freeze(state);
    console.log("action: ", action);
    switch(action.type) {
        case RECEIVE_FETCHED_THINGS:
            const things = action.things;
            // console.log("state: ", state);
            // console.log("action.things: ", action.things);
            return merge({}, state, things);
        // case RECEIVE_SEARCHED_THINGS:
        //     return state.concat([action.things]);
        default:
            console.log("return default state");
            return state;
    }
}

export default thingsReducer;
