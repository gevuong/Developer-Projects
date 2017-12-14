import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

var PLAYERS = [
  {
    name: "Mohandas Gandhi",
    score: 0,
  },
  {
    name: "Pablo Picasso",
    score: 0,
  },
  {
    name: "Sigmund Freud",
    score: 0,
  },
  {
    name: "Maria Montessori",
    score: 0,
  },
  {
    name: "Carl Jung",
    score: 0,
  },
]

var playerId = 3; // incremented to assign unique ID for each added player

class Stopwatch extends Component {
  constructor() {
    super();
    this.state = {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    }
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onTick = this.onTick.bind(this);
  }

  // As soon as Stopwatch component is added to DOM on page, componentDidMount() will be called. Convenient for setting up timers, data fetching, etc.
  componentDidMount() {
    this.interval = setInterval(this.onTick, 100); // invisible event
  }

  // invoked immediately before component is removed from DOM. Convenient for invalidating timers, canceling network requests, or DOM elements created in componentDidMount. In case if stopwatch no longer needs to rendered, clearInterval will remove setInterval, which can keep Stopwatch component in memory, causing a memory leak.
  componentWillUnmount() {
    clearInterval(this.interval); // cleanup interval
  }

  // how to get onTick to be called over and over again? Cannot put in render(), but can be placed in componentDidMount().
  onTick() {
    console.log("onTick");
    if (this.state.running) {
      let timeNow = Date.now(); // returns number of ms since Jan 1,1970 (UNIX epoch)
      this.setState({
        previousTime: timeNow,
        elapsedTime: this.state.elapsedTime + (timeNow - this.state.previousTime),
      });
    }
  }

  onStart(e) {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  }

  onStop(e) {
    this.setState({ running: false });
  }

  onReset() {
    this.setState({
      running: false,
      elapsedTime: 0,
      previousTime: Date.now() // update previousTime so next tick will get exact same amount of ms between when we reset versus the previous tick.
    });
  }

  render() {
    // let milliseconds = Math.floor(this.state.elapsedTime / 10);
    let seconds = Math.floor(this.state.elapsedTime / 1000);
    let minutes = Math.floor(seconds / 60);
    // let hours = Math.floor(minutes / 60);
    return(
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        { minutes >= 1 ?
          <div className="stopwatch-time">{ minutes }:{ seconds % 60 }</div>
          :
          <div className="stopwatch-time">{ seconds % 60 }</div>
        }
        {/* alternative can be { this.state.running ? "Start" : "Stop" } */}
        { this.state.running ?
          <button type="submit" onClick={this.onStop}>Stop</button>
          :
          <button type="submit" onClick={this.onStart}>Start</button>
        }
        <button onClick={this.onReset}>Reset</button>
      </div>
    )
  }
}

// Controlled Component is when an input form element (i.e <input>, <textarea>, <select>), maintain their own state and update based on user input. The input form element's value is controlled by React. Every state mutation (i.e this.state.name) will have an associated handler fcn (i.e onNameChange()). React state is the "single source of truth" because for example, the displayed value in form element will always be "this.state.value".
class AddPlayerForm extends Component {
  constructor(props) {
    super(props);

    AddPlayerForm.propTypes = {
      onAdd: PropTypes.func.isRequired,
    }
    this.state = { name: "" }; // The state called "name" is considered a local component state

    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  // event.target represents <input> element generated in form. Since onNameChange() runs on every keystroke to update React state, the displayed value will update as user types.
  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.name.split(" ").join("").length > 0) {
      this.props.onAdd(this.state.name);
      this.setState({ name: "" });
    }
  }

  // when form submits, page refreshes. Use preventDefault()
  render() {
    return (
      <div className="add-player-form">
        <form onSubmit={ this.onSubmit } >
          <input type="text" value={ this.state.name } onChange={ this.onNameChange }></input>
          <input type="submit" value="Add Player" ></input>
        </form>
      </div>
    )
  }
}

function Stats(props) {
  const totalPlayers = props.players.length;
  const totalPoints = props.players.reduce(function(total, player) {
    return total += player.score;
  }, 0);
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

Stats.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
}

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
}

// cannot just pass props.onChange() because we need to apply a value to it. So use an anonymous fcn to call props.onChange() with appropriate argument. Add onClick() in <button> because score changes, so parent component will know Counter has changed in some way.
function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={() => {props.onChange(-1)}} > - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={() => {props.onChange(1)}} > + </button>
    </div>
  );
}

Counter.propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,

  // To see Counter as component class, see code at bottom of page.
};


function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>&#10006;</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange} />
      </div>
    </div>
  );
}

// relay another property, onScoreChange, that has a value of a callback fcn
Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}


class App extends Component {
  constructor(props) {
    super(props);
    // initialPlayers is an array of objects with the following shape, that needs to be passed in. title is optional.
    App.propTypes = {
      title: PropTypes.string,
      initialPlayers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.number.isRequired,
        score: PropTypes.number.isRequired,
      })).isRequired,
    };

    this.state = {
      players: this.props.initialPlayers,
    };
    this.onPlayerAdd = this.onPlayerAdd.bind(this);
    // this.onScoreChange = this.onScoreChange.bind(this); Don't need, but why?
  }

  onScoreChange(id, delta) {
    if (this.state.players[id].score > 0 ) {
      this.state.players[id].score += delta;
      this.setState(this.state);
    } else {
      if (delta > 0) this.state.players[id].score += delta;
      this.setState(this.state);
    }
  }

  onPlayerAdd(name) {
    // console.log("player added: ", name);
    this.state.players.push({ // .push() persists to array, opposed to .concat()
      name: name,
      score: 0,
    })
    this.setState(this.state);
    playerId += 1; // used only if I want to assign unique ID to each added player
  }

  onRemovePlayer(idx) {
    // console.log("player removed:", this.state.players[idx].name)
    this.state.players.splice(idx, 1);
    this.setState(this.state);
  }

  // Within function of map iterator, "this" doesn't point to appropriate instance. Need to call .bind(this) on anonymous fcn to make "this" within fcn apply to same "this" outside of fcn. If passing an anonymous fcn as prop, use arrow fcn within .map() to avoid .bind(this). Using other anonymous fcn syntax does not autobind, so will lose its binding to "this".
  render() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />
        <div className="players">
          {this.state.players.map((player, idx) => {
            return (
              <Player
                onRemove={() => this.onRemovePlayer(idx)}
                onScoreChange={delta => this.onScoreChange(idx, delta)}
                name={player.name}
                score={player.score}
                key={idx} />
            );
          })}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd} />
      </div>
    );
  }
}

App.defaultProps = {
  title: "My Scoreboard",
};

// <App /> creates an instance of the App component in JSX
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App initialPlayers={PLAYERS}/>, document.getElementById('root'));
});
// first arg in ReactDOM.render() is virtualDOM element, second arg is real DOM element where we want to place our virtual DOM. Above code says to create an <App /> instance (or React element) and render within a DOM element called "root" on the page.


// Component class of Counter
// class Counter extends Component {
//   constructor(props) {
//     super(props);
//     Counter.propTypes = {
//       score: PropTypes.number.isRequired,
//       onChange: PropTypes.func,
//     };
//     this.state = {score: this.props.score};
//
//     this.decrementScore = this.decrementScore.bind(this);
//     this.incrementScore = this.incrementScore.bind(this);
//   }
//
//   decrementScore() {
//     if (this.state.score > 0) {
//       this.setState({
//         score: (this.state.score -= 1),
//       });
//     }
//   }
//
//   incrementScore() {
//     this.setState({
//       score: (this.state.score += 1),
//     });
//   }
//
//   render() {
//     return(
//       <div className="counter">
//         <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
//         <div className="counter-score"> {this.state.score} </div>
//         <button className="counter-action increment" onClick={this.incrementScore}> + </button>
//       </div>
//     )
//   }
// }
