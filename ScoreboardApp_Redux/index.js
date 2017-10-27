// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Components and Store
import ScoreboardContainer from './src/containers/ScoreboardContainer';
import store from './src/store/store';

// css
import './css/style.css'; // no longer need <link> in index.html because webpack handles it due to style-loader and css-loader

// <Scoreboard /> creates an instance of the Scoreboard component in JSX
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <ScoreboardContainer />
    </Provider>,
    document.getElementById('root'));
});
// first arg in ReactDOM.render() is virtualDOM element, second arg is real DOM element where we want to place our virtual DOM. Above code says to create an <Scoreboard /> instance (or React element) and render within a DOM element called "root" on the page.

// <Provider> is a special React Redux component that receives store as a prop, and passes store (an invisible prop) down to all its children. Because we wrapped Scoreboard in <Provider>, all components will receive store context. In other words, <Provider> makes store available to all container components in app without passing it explicitly.
