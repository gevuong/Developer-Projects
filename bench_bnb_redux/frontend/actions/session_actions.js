import * as APIUtil from '../util/session_api_util';


// sync action creators
export const receiveCurrentUser = currentUser => {
    type: RECEIVE_CURRENT_USER,
    currentUser
}

export const receiveSessionErrors = errors => {
    type: RECEIVE_SESSION_ERRORS,
    errors
}


// thunk action creators will curry in arguments and return functions. First curried 
export const signup = user => dispatch => (
    APIUtil.signup(user).then(user => (
        dispatch(receiveCurrentUser(user))
    )),
    errors => (
        dispatch(receiveErrors(error.responseJSON))
    )
)


export const login = user => dispatch => (
    APIUtil.login(user).then(user => (
        dispatch(receiveCurrentUser(user))
    )),
    errors => (
        dispatch(receiveErrors(error.responseJSON))
    )
)

export const logout = user => dispatch => (
    APIUtil.logout(user).then(user => (
        dispatch(receiveCurrentUser(null))
    )),
    errors => (
        dispatch(receiveErrors(error.responseJSON))
    )
)
