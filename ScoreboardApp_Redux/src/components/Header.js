// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Stopwatch from './Stopwatch';
import Stats from './Stats';

// Pure, stateless, presentational component, does not manage its own state or use lifecycle events.
const Header = props => {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>{props.title}</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
}

export default Header;
