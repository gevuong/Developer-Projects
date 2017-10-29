// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Pure, stateless function, presentational component that does not manage its own state or use lifecycle events.
const Counter = props => {
  return (
    <div className="counter">
      <button className="counter-action decrement"
        onClick={ props.score > 0 ?
          () => props.updatePlayerScore(props.index, -1)
          :
          () => props.updatePlayerScore(props.index, 0)
        }
      > - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment"
        onClick={ props.score >= 0 ?
          () => props.updatePlayerScore(props.index, 1)
          :
          () => props.updatePlayerScore(props.index, 0)
          }
      > + </button>
    </div>
  );
}

Counter.propTypes = {
  index: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  updatePlayerScore: PropTypes.func.isRequired,
};

export default Counter;
