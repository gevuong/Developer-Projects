// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from './components/Scoreboard';;

// css
import './css/style.css'; // no longer need <link> in index.html because webpack handles it due to style-loader and css-loader

// var PLAYERS = [
//   {
//     name: "Mohandas Gandhi",
//     score: 23,
//   },
//   {
//     name: "Pablo Picasso",
//     score: 15,
//   },
//   {
//     name: "Sigmund Freud",
//     score: 56,
//   },
//   {
//     name: "Maria Montessori",
//     score: 89,
//   },
// ]

// <App /> creates an instance of the App component in JSX
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Scoreboard />, document.getElementById('root'));
});
// first arg in ReactDOM.render() is virtualDOM element, second arg is real DOM element where we want to place our virtual DOM. Above code says to create an <App /> instance (or React element) and render within a DOM element called "root" on the page.
