import React, { Component } from 'react';

class SearchForm extends Component {
  constructor() {
    super()

    this.onSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {

  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search..."></input>
      </form>
    )
  }
}
