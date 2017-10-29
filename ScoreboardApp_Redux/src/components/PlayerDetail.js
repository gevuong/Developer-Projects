import React from 'react';
import PropTypes from 'prop-types';

const PlayerDetail = ({ selectedPlayer }) => {
  // if selectedPlayer not undefined
  if (selectedPlayer) {
    return (
      <div>
        <h3>{ selectedPlayer.name }</h3>
        <ul>
          <li>
            <span>Score: </span>
            { selectedPlayer.score }
          </li>
          <li>
            <span>Created: </span>
            { selectedPlayer.created }
          </li>
          <li>
            <span>Updated: </span> 
            { selectedPlayer.updated }
          </li>
        </ul>
      </div>
    )
  }
  else {
    return (
      <p>Click on a player to see more details</p>
    );
  }
}

PlayerDetail.propTypes = {
  selectedPlayer: PropTypes.object, // not required, can be undefined, however it should be a player object
}

export default PlayerDetail;
