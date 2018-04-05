import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './frontend/autocomplete';

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
