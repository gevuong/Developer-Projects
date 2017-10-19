import React, { Component } from 'react';
import Gif from './Gif';

// Presentational Component
const GifList = props => {
  let gifs = props.gifs.map(gif => {
    return (
      <Gif url={gif.images.fixed_height.url} key={gif.id} />
    )
  // for implicit return: see code at bottom of page
  });

  return (
    <ul className="gif-list">
      {gifs}
    </ul>
  );
}

export default GifList;

// let gifs = props.gifs.map((gif, idx) =>
//   <Gif url={gif.images.fixed_height.url} key={idx} />
// )
