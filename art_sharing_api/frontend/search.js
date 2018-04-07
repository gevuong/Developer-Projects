import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';

// Uncomment the following for testing purposes only:
import { receiveFetchedThings, receiveSearchedThings, requestFetchThings, requestSearchThings } from './actions/thing_actions';
import { fetchAllThings, searchAllThings } from './util/thing_api_util';

// defensive programming technique: use DOMContentLoaded event to allow bundle.js script tag to be placed elsewhere in index.html. Browser loads JS code, but waits until DOM Content is parsed and loaded before running JS code against it.
document.addEventListener("DOMContentLoaded", () => {
    let store = configureStore();
    const rootEl = document.getElementById("root");
    ReactDOM.render(<Root store={ store } />, rootEl);

    // Uncomment the following for testing purposes only:
    // window.configureStore = configureStore;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.requestFetchThings = requestFetchThings;
    window.requestSearchThings = requestSearchThings;
    window.receiveFetchedThings = receiveFetchedThings;
    window.receiveSearchedThings = receiveSearchedThings;
    window.fetchAllThings = fetchAllThings;
    window.searchAllThings = searchAllThings;

    // fetchAllThings().then(
    //     things => dispatch(receiveFetchedThings(things))
    // );

});
