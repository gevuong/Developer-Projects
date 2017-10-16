// first arg is virtualDOM element, second arg is realDOM element where we want to place our virtual DOM. This code says to render a virtual DOM with text Hello World into an element called "container" on the page.

import React from 'react';
import ReactDOM from 'react-dom';

// function that returns React VirtualDOM elements.
function App() {
  return (
    <div>
      <h1>Hello from React</h1>
      <p>I was rendered from the App component!</p>
    </div>
  );
}

// <App /> creates an instance of the App component in JSX
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});



// Notes:
// All React components, declared as a function or class, must act like pure functions with respect to their props. A "pure" function does not change their inputs, and always return same result for the same input.
// A React component must return a single Virtual DOM element. This is why we wrap all other elements in a single <div> element.
// JSX is an extension to JS that allows us to use XML syntax to build React.createElement calls. JSX is not HTML.
// Babel is a JS compiler used to translate JSX files into standard JavaScript
