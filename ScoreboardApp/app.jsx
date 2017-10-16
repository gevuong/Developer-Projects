// first arg is virtualDOM element, second arg is realDOM element where we want to place our virtual DOM. This code says to render a virtual DOM with text Hello World into an element called "container" on the page.

import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<h1>Hey</h1>, document.getElementById('root'));
});
