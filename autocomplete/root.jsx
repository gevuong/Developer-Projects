import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './frontend/autocomplete';

const Root = () => {
    return (
        <div>
            <AutoComplete />
        </div>
    )
}
document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    ReactDOM.render(<Root />, root);
});
