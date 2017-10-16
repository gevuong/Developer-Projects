import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

var PLAYERS = [
  {
    name: "George V.",
    score: 12,
  },
  {
    name: "George Foreman",
    score: 2,
  },
  {
    name: "George St. Pierre",
    score: 1,
  },
]
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
        {props.players.map(function(player, id) {
          return <Player name={player.name} score={player.score} key={id}/>
        })}
      </div>
    </div>
  );
}

// Players is an array of objects with the following shape, that needs to be passed in. title is optional.
App.propTypes = {
  title: PropTypes.string,
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

App.defaultProps = {
  title: "My Scoreboard",
};

// <App /> creates an instance of the App component in JSX
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App players={PLAYERS}/>, document.getElementById('root'));
});

// first arg in ReactDOM.render() is virtualDOM element, second arg is real DOM element where we want to place our virtual DOM. Above code says to create an <App /> instance (or React element) and render within a DOM element called "root" on the page.

// Remember, React keeps a copy of the previous Virtual DOM. A unique key is required to help React understand which object maps to which virtual DOM element. So if item in list is rearranged, added, or deleted, React can use key to reorder list as opposed to changing the content for each DOM Node (or item) based on position in list.

// Cannot use JS for loop to iterate over items inside JSX expression. Need to use .map().

// Break component into smaller components when component has too much markup, a component does too many things, or when component is reused.
