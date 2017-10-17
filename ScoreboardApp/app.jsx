import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

var PLAYERS = [
  {
    name: "George V.",
    score: 4,
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

class AddPlayerForm extends Component {
  constructor(props) {
    super(props);

    AddPlayerForm.propTypes = {
      onAdd: PropTypes.func.isRequired,
    }
    this.state = {name: ""};

    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  // event.target represents <input> element generated in form. When onNameChange gets called or everytime you type, state gets updated, which will cause a re-render. And since this.state.name is updated, text is kept in <input> field.
  onNameChange(e) {
    this.setState({name: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  }

  // when form submits, page refreshes. Use preventDefault()
  render() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit} >
          <input type="text" value={this.state.name} onChange={this.onNameChange}></input>
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
      {/* This is how to comment in JSX */}
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
};

// relay another property, onScoreChange, that has a value of a callback fcn
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func.isRequired,
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
    }

    this.onPlayerAdd = this.onPlayerAdd.bind(this);
    // this.onScoreChange = this.onScoreChange.bind(this);
  }

  onScoreChange(id, delta) {
    console.log('onScoreChange', id, delta)
    if (this.state.players[id].score > 0 ) {
      this.state.players[id].score += delta;
      this.setState(this.state);
    } else {
      if (delta > 0) this.state.players[id].score += delta;
      this.setState(this.state);
    }
  }

  onPlayerAdd(name) {
    console.log("player added: ", name);
    this.state.players.push({
      name: name,
      score: 0,
    })
    this.setState(this.state);
    // console.log(this.state.players);
  }

  // Within function of map iterator, "this" doesn't point to appropriate instance. Need to call .bind(this) on anonymous fcn to make "this" within fcn apply to same "this" outside of fcn. Use arrow fcn within .map() to avoid .bind(this).
  render() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />
        <div className="players">
          {this.state.players.map((player, id) => {
            return (
              <Player
                onScoreChange={delta => this.onScoreChange(id, delta)}
                name={player.name}
                score={player.score}
                key={id} />
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

// In normal JS, passing a method to "this" would lose the methods association to the instance of the class it is in, because "this" is either null or window. By using .bind(this), it passes instance of function to the current instance "this" is bound to.

// this.setState() notifies the class it's in that state has been updated, and render method will be called again, and create a DOM tree where this.state.score increments/decrements by 1.

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
