import React, { Component } from 'react';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: "" }; // local state thats needed for component to work, not really part of application state
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(e) {
    // e.currentTarget.value same output?
    this.setState({ searchText: e.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.state.searchText);
    e.currentTarget.reset(); // reset() resets values of all elements in form
    // target vs currentTarget see NOTES.md
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit} >
        <input type="text"
               placeholder="Search..."
               onChange={ this.onSearchChange }>
        </input>
        <button type="submit" className="search-button">
          <i className="material-icons icn-search">search</i>
        </button>
      </form>
    )
  }
}

// Suppose you have access to event object but not DOM element. "currentTarget" returns DOM element that's associated with event handler you defined, or the element you actually bound the event to.
// "target" is whatever you actually clicked on to trigger event.

// Alternative to writing SearchForm component without constructor fcn or .bind() shown in SearchForm2.js. Need babelrc.
