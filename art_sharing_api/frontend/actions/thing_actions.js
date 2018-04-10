import { fetchAllThings, searchAllThings } from '../util/thing_api_util';

// export action type
export const RECEIVE_FETCHED_THINGS = 'RECEIVE_FETCHED_THINGS';

// sync action creator
export const receiveFetchedThings = things => (
    {
        type: RECEIVE_FETCHED_THINGS,
        things,
    }
);

// async thunk action creator
export const requestFetchThings = () => dispatch => {
    return fetchAllThings().then(
        things => dispatch(receiveFetchedThings(things))
    );
};
