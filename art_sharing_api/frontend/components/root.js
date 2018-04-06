import React from 'react';
import { Provider } from 'react-redux'; // A React component that magically makes store available to all containers in app without passing it explicitly.

import AutoCompleteContainer from './autocomplete_container';

// All container components need access to Redux store.
const Root = ({ store }) => {
    return (
        <Provider store={ store }>
            <div>
                <AutoCompleteContainer />
            </div>
        </Provider>
    )
}

export default Root;
