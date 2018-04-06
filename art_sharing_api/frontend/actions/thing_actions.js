import fetchAllThings from '../util/thing_api_util';

// export action type
export const RECEIVE_ALL_THINGS = 'RECEIVE_ALL_THINGS';

// sync action creator
export const receiveAllThings = things => (
    {
        type: RECEIVE_ALL_THINGS,
        things,
    }
);

// async thunk action creator
export const requestAllThings = () => {
    return fetchAllThings().then(
        things => dispatch(receiveAllThings(things))
    );
};
