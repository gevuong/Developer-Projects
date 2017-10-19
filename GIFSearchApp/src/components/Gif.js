import React from 'react';

// Presentational component
const Gif = props => {
  return (
    <li className="gif-wrap" alt="gif">
      <img src={props.url}></img>
    </li>
  );
};

export default Gif;

// The "alt" attribute im <img> provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).
