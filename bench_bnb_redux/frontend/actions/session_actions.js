import * as APIUtil from '../util/session_api_util';


// sync action creators return a POJO with a required type property and any additional data
export const receiveCurrentUser = currentUser => {
    type: RECEIVE_CURRENT_USER,
    currentUser
}

export const receiveSessionErrors = errors => {
    type: RECEIVE_SESSION_ERRORS,
    errors
}


// thunk action creators will curry in arguments and return functions. First curried arg will be whatever data being used, second curried arg will be dispatch() taken from the store. You should have a thunk action creator for each APIUtil AJAX request.
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
