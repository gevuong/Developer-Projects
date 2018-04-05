import React from 'react';
import { Provider } from 'react-redux'; // A React component that magically makes store available to all containers in app without passing it explicitly.

import AutoComplete from './autocomplete';

const NAMES = [
    "steve",
    "ridge",
    "wood",
    "vineyard",
    "woodbridge",
    "coffee",
    "content",
    "bridge"
]

// All container components need access to Redux store.
const Root = ({ store }) => {
    return (
        <Provider store={ store }>
            <div>
                <AutoComplete names={ NAMES } />
            </div>
        </Provider>
    )
}

export default Root;
