import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './frontend/autocomplete';

const NAMES = ["Steve", "Jasmine", "Dick", "Vineyard", "Woodbridge", "Coffee", "Content"
]

const Root = () => {
    return (
        <div>
            <AutoComplete names={ NAMES } />
        </div>
    )
}
document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    ReactDOM.render(<Root />, root);
});
