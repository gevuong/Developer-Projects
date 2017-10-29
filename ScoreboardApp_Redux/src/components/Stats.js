// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Pure, stateless function, presentational component, does not manage its own state, or use lifecycle events.
const Stats = props => {
  const totalPlayers = props.players.length;
  const totalPoints = props.players.reduce(function(total, player) {
    return total += player.score;
  }, 0);
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{ totalPlayers }</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{ totalPoints }</td>
        </tr>
      </tbody>
    </table>
  )
}

Stats.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    created: PropTypes.string,
    updated: PropTypes.string,
  })).isRequired,
}

export default Stats;
