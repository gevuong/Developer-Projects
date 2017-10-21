import React, { Component } from 'react';
import SearchForm from './SearchForm';
// import SearchForm2 from './src/components/SearchForm2';
import GifList from './GifList';
import axios from 'axios';
import 'whatwg-fetch'; // used to support old browsers when using fetchAPI

export default class App extends Component {
  constructor() {
    super(); // Calling super() allows us to use "this" inside constructor within context of App class, rather than parent Component class extending from React.
    this.state = {
      gifs: [],
      loading: true,
    };

    this.performSearch = this.performSearch.bind(this);
  }

  // method runs immediately after component is added to DOM. Convenient for loading external data because at this point in the lifecycle, component has a DOM representation
  componentDidMount() {
    this.performSearch(); // initially renders default query of corgis

    axios.get('https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=24')
      .then(response =>
        this.setState({ gifs: response.data.data, }) // response.data is response provided by server already in JSON format. Append .data to access GiphyAPI data array.
      )
      .catch(error => {
        console.log("Error fetching and parsing data: ", error);
      });
    // To use fetchAPI method instead: refer to code at bottom of page
  }

  performSearch(query = "corgis") {
    fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=dc6zaTOxFJmzC&limit=24`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        gifs: responseData.data,
        loading: false, // because at this point, data has already been fetched
      });
    })
    .catch(error =>
      console.log("Error fetching and parsing data: ", error)
    )
  }

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GIFSearch</h1>
            <SearchForm onSearch={query => this.performSearch(query)} />
            {/* <SearchForm onSearch={this.onSearch} passes fcn as a prop to SearchForm as well />*/}
          </div>
        </div>
        <div className="main-content">
          {this.state.loading
            ? <h3>Loading...</h3>
            : <GifList gifs={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}

// fetchAPI method:
// fetchAPI returns a JS promise, and if promise is "fulfilled", which is when browser receives data from the server, .then() methods which store callbacks will get executed
// fetch("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=24")
// .then(response => response.json())
// .then(responseData =>
//   this.setState({ gifs: responseData.data })
// )
// // if promise is not "fulfilled" and gets rejected (i.e. you're offline, or API server is down), use catch() to "catch" or handle any errors.
// .catch(error =>
//   console.log("Error fetching and parsing data: ", error)
// );
