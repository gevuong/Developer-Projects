import React from 'react';
import { Provider } from 'react-redux'; // A React component that magically makes store available to all containers in app without passing it explicitly.

import ThingsIndexContainer from './things_index_container';

// All container components need access to Redux store.
const Root = ({ store }) => {
    return (
        <Provider store={ store }>
            <div>
                <h1>Render Root Component</h1>
                <ThingsIndexContainer />
            </div>
        </Provider>
    )
}

export default Root;
