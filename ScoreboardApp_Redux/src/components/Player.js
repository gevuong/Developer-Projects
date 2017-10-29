// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Counter from './Counter';

// Pure, stateless, presentational component that does not manage its own state or use lifecycle events
const Player = props => {
  return (
    <div className="player">
      <div className="player-name"
        onClick={ () => props.selectPlayer(props.index) }> {/* onClick invokes selectPlayer bound action creator */}
        <a className="remove-player"
          onClick={ () => props.removePlayer(props.index) }>
          &#10006;
        </a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter
          index={props.index}
          score={props.score}
          updatePlayerScore={props.updatePlayerScore} />
      </div>
    </div>
  );
}

// relay another property, onScoreChange, that has a value of a callback fcn
Player.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  updatePlayerScore: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  selectPlayer: PropTypes.func.isRequired,
}

export default Player;
