// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';

var playerId = 3; // incremented to assign unique ID for each added player

// Container component, propagates data down to presentational components. Interacts with and receives data from single object storing entire state of app.
class Scoreboard extends Component {
  constructor(props) {
    super(props);
    // initialPlayers is an array of objects with the following shape, that needs to be passed in. title is optional.
    // Scoreboard.propTypes = {
    //   title: PropTypes.string,
    //   initialPlayers: PropTypes.arrayOf(PropTypes.shape({
    //     name: PropTypes.number.isRequired,
    //     score: PropTypes.number.isRequired,
    //   })).isRequired,
    // };
    this.state = {
      players: [
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
      ]
    }
    // this.state = {players: this.props.initialPlayers};
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

Scoreboard.defaultProps = {
  title: "My Scoreboard",
};

export default Scoreboard;
