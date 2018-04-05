import fetchAllThings from '../util/thing_api_util';

// export action type
export const RECEIVE_THINGS = 'RECEIVE_THINGS';

// sync action creator
export const receiveThings = things => (
    {
        type: RECEIVE_THINGS,
        things,
    }
);
