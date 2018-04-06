import { RECEIVE_ALL_THINGS } from '../actions/thing_actions';

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

// reducer must never mutate previus state. Instead, return a new array or object with the necessary changes.

const thingsReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_ALL_THINGS:
            return state.concat([action.things]);
        default:
            return state;
    }
}

export default thingsReducer;
