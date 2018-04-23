import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER, RECEIVE_SESSION_ERRORS } from '../actions/session_action';

// optional, but establish default state shape
const _nullUser = {
    currentUser: null,
    errors: [],
}
Object.freeze(_nullUser);

export const sessionReducer = (state = _nullUser, action) => {
    Object.freeze(state);

    switch(action.type) {
        case: RECEIVE_CURRENT_USER:
            const currentUser = action.currentUser;
            return merge(state, { currentUser });
        case: RECEIVE_SESSION_ERRORS:
            const sessionError = action.sessionError;
            return merge(state, { errors });
        default:
            return state;
    }
}
