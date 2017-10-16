import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
        {/* This is how to comment in JSX */}
      </div>
      <div className="player-score">
        <Counter score={props.score} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
}

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement"> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment"> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: PropTypes.number.isRequired,
}

function App(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
      <div className="players">
        <Player name="George V." score={13 - 1} />
        <Player name="George Foreman" score={23} />
        <Player name="George St.Pierre" score={4} />
      </div>
    </div>
  );
}

App.defaultProps = {
  title: "My Scoreboard",
};

// <App /> creates an instance of the App component in JSX
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

// first arg in ReactDOM.render() is virtualDOM element, second arg is real DOM element where we want to place our virtual DOM. Above code says to create an <App /> instance (or React element) and render within a DOM element called "root" on the page.
