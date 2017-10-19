import React, { Component } from 'react';
import Gif from './Gif';

export default class GifList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Gif />
      </div>
    );
  }
}
