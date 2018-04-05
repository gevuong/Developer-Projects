import { RECEIVE_ALL_THINGS } from '../actions/thing_actions';

// temporary to test
const NAMES = [
    "steve",
    "ridge",
    "wood",
    "vineyard",
    "woodbridge",
    "coffee",
    "content",
    "bridge"
]

// reducer must never mutate previus state. Instead, return a new array or object with the necessary changes.

const thingsReducer = (state = NAMES, action) => {
    switch(action.type) {
        case RECEIVE_ALL_THINGS:
            return state.concat([action.things]);
        default:
            return state;
    }
}

export default thingsReducer;
