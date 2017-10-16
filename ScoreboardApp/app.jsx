import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

var PLAYERS = [
  {
    name: "George V.",
    score: 3,
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
      {/* This is how to comment in JSX */}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// In ES6 Component class, "props" is actually a property of the class itself. It does not get passed into the render function like it does in a stateless functional component. Therefore, "this" is required in "props.initialScore". An ES6 Component class does not autobind all methods to its instance.
class Counter extends Component {
  constructor(props) {
    super(props);
    Counter.propTypes = {
      initialScore: PropTypes.number.isRequired,
    };
    this.state = {score: this.props.initialScore};
    // Explicitly use .bind(this) in constructor because declaring ES6 classes does not autobind "this" to methods written in ES6 class.
    this.incrementScore = this.incrementScore.bind(this);
    this.decrementScore = this.decrementScore.bind(this);
  }

  incrementScore() {
    // this.setState() notifies Counter class that state has been updated, and render method will be called again, and create a DOM tree where this.state.score increments/decrements by 1.
    this.setState({
      score: (this.state.score + 1),
    });
  }

  decrementScore() {
    console.log(this.state.score);
    if (this.state.score > 0) {
      this.setState({
        score: (this.state.score - 1),
      });
    }
  }

  render() {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
        <div className="counter-score"> {this.state.score} </div>
        <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>
    );
  }
}

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter initialScore={props.score}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}

function App(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
      <div className="players">
        {props.players.map(function(player, id) {
          return <Player name={player.name} score={player.score} key={id} />
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

// In normal JS, passing a method to "this" would lose the methods association to the instance of the class it is in, because "this" is either null or window. By using .bind(this), it passes instance of function to the current instance "this" is bound to.
