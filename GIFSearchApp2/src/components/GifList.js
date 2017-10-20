import React, { Component } from 'react';
import Gif from './Gif';
import NoGifs from './NoGifs';

// Presentational Component
const GifList = props => {
  let gifArray = props.gifs;
  let gifs;

  if (gifArray.length > 0) {
    gifs = props.gifs.map(gif => (
        <Gif url={gif.images.fixed_height.url} key={gif.id} />
      )
    );

    return (
      <ul className="gif-list">
        {gifs}
      </ul>
    );

  } else {
    return (
      <ul className="gif-list">
        <NoGifs />
      </ul>
    );
  }

}

export default GifList;

// implicit return:
// let gifs = props.gifs.map(gif => (
//   <Gif url={gif.images.fixed_height.url} key={gif.id} />
// )
