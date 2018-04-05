import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';

document.addEventListener("DOMContentLoaded", () => {
    let store = configureStore();
    const rootEl = document.getElementById("root");
    ReactDOM.render(<Root store={ store } />, rootEl);
});
