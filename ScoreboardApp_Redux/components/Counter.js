// Libs
import React from 'react';
import PropTypes from 'prop-types';


// cannot just pass props.onChange() because we need to apply a value to it? So use an anonymous fcn to call props.onChange() with appropriate argument. Add onClick() in <button> because score changes, so parent component will know Counter has changed in some way.

// Pure, stateless, presentational component that does not manage its own state or use lifecycle events.
const Counter = props => {
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

export default Counter;
