import React, { Component } from 'react';
import SearchForm from './src/components/SearchForm';
import GifList from './src/components/GifList';

export default class App extends Component {
  constructor() {
    super(); // Figure out what the point of super() is

  }

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">Gifsearch</h1>
            <SearchForm />
          </div>
        </div>
        <div className="main-content">
          <GifList />
        </div>
      </div>
    );
  }
}
