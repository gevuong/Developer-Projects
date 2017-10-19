import React, { Component } from 'react';

export default class SearchForm extends Component {
  constructor() {
    super();
    this.state = {searchText: ""};
    // this.onHandleSubmit = this.onHandleSubmit.bind(this); // don't need when submitting form??
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(e) {
    console.log(e.target.value);
    // console.log(e.currentTarget.value); // same output?
    this.setState({ searchText: e.target.value });
  };

  onHandleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.onHandleSubmit}>
        <input type="text" placeholder="Search..." onChange={this.onSearchChange}></input>
        <button type="submit" className="search-button"><i className="material-icons icn-search">search</i></button>
      </form>
    )
  }
}
