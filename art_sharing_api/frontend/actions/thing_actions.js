import { fetchAllThings, searchAllThings } from '../util/thing_api_util';

// export action type
export const RECEIVE_FETCHED_THINGS = 'RECEIVE_FETCHED_THINGS';
export const RECEIVE_SEARCHED_THINGS = 'RECEIVE_SEARCHED_THINGS';

// sync action creator
export const receiveFetchedThings = things => (
    {
        type: RECEIVE_FETCHED_THINGS,
        things,
    }
);

export const receiveSearchedThings = things => (
    {
        type: RECEIVE_SEARCHED_THINGS,
        things,
    }
);

// async thunk action creator
export const requestFetchThings = () => dispatch => {
    return fetchAllThings().then(
        things => dispatch(receiveFetchedThings(things))
    );
};

export const requestSearchThings = query => dispatch => {
    return searchAllThings(query).then(
        things => dispatch(receiveSearchedThings(things))
    );
};
