// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Counter from './Counter';

// Pure, stateless, presentational component that does not manage its own state or use lifecycle events
const Player = props => {
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

export default Player;
