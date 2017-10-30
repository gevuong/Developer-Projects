// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Header from '../components/Header';
import Player from '../components/Player';
import AddPlayerForm from '../components/AddPlayerForm';
import PlayerDetail from './PlayerDetail';

var playerId = 3; // incremented to assign unique ID for each added player

// Container component, propagates data down to presentational components. Interacts with and receives data from single object storing entire state of app.
class Scoreboard extends Component {
  constructor(props) {
    super(props);

    Scoreboard.propTypes = {
      players: PropTypes.array.isRequired,
      selectedPlayerIndex: PropTypes.number.isRequired,
      addPlayer: PropTypes.func.isRequired,
      removePlayer: PropTypes.func.isRequired,
      updatePlayerScore: PropTypes.func.isRequired,
      selectPlayer: PropTypes.func.isRequired,
    }
  };

  // Within function of map iterator, "this" doesn't point to appropriate instance. Need to call .bind(this) on anonymous fcn to make "this" within fcn apply to same "this" outside of fcn. If passing an anonymous fcn as prop, use arrow fcn within .map() to avoid .bind(this). Using other anonymous fcn syntax does not autobind, so will lose its binding to "this".
  render() {
    const { players, addPlayer, removePlayer, updatePlayerScore, selectPlayer, selectedPlayerIndex } = this.props;

    let selectedPlayer; // initially set to undefined
    if (selectedPlayerIndex !== -1) {
      selectedPlayer = players[selectedPlayerIndex];
    }

    let playerComponent = players.map((player, index) => {
      return (
        <Player
          index={index}
          removePlayer={removePlayer}
          updatePlayerScore={updatePlayerScore}
          selectPlayer={selectPlayer}
          name={player.name}
          score={player.score}
          key={index}
        />
      )
    });

    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={ players } />
        <div className="players">
          { playerComponent }
        </div>
        <AddPlayerForm addPlayer={ addPlayer } />
        <div className="player-detail">
          <PlayerDetail
            players={players}
            selectedPlayer={selectedPlayer}
          />
        </div>
      </div>
    );
  }
}

Scoreboard.defaultProps = {
  title: 'My Scoreboard',
};

export default Scoreboard;

// 1st arg contains function we want to use to transform state to props. 2nd arg is container we want to connect to Redux. It subscribes scoreboard to any changes in state or any Redux store updates, and whenever that occurs, our mapStateToProps is invoked, and result is passed as a prop to Scoreboard.
