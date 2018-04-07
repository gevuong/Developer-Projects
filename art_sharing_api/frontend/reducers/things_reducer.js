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

const defaultState = Object.freeze({
    things: [],
});
// reducer must never mutate previus state. Instead, return a new array or object with the necessary changes.

const thingsReducer = (state = defaultState, action) => {
    switch(action.type) {
        case RECEIVE_FETCHED_THINGS:
            console.log("state: ", state);
            console.log("action.things: ", action.things);

            return state.concat([action.things]);
        case RECEIVE_SEARCHED_THINGS:
            return state.concat([action.things]);
        default:
            return state;
    }
}

export default thingsReducer;
