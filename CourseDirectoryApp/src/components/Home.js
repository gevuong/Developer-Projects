import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Featured from './Featured';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.fname);
    console.log(this.lname);
    let teacherFirstName = this.fname.value;
    let teacherLastName = this.lname.value;
    let teacherTopic = this.topic.value;
    let path = `/teachers/${teacherTopic}/${teacherFirstName}-${teacherLastName}`;
    this.props.history.push(path); // push the path variable onto history stack, and will redirect the user to the URL stored in path.
  }

  render() {
    return (
      <div className="main-content home">
        <h2>Front End Course Directory</h2>
        <hr />
        <h3>Featured Teachers</h3>
        <Link to="/teachers/HTML/Tom-Ford">Tom Ford</Link>
        <Link to="/teachers/CSS/Guil-Hernandez">Guil Hernandez</Link>
        <hr />
        <form onSubmit={this.handleSubmit}>
          Input Teacher and Topic below to search
          <div>
            <input type="text" placeholder="first name" ref={ input => this.fname = input } />
            <input type="text" placeholder="last name" ref={ input => this.lname = input } />
            <input type="text" placeholder="topic" ref={ input => this.topic = input } />
            <button type="submit">GO!</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Home;
// React router passes rendered components information about the current path and URL the route is matching. The component also gets passed a history object that listens for changes to the current URL, keeps tracks of browser history and the number of entries in the history stack. And by history stack I mean previously visited URLs.

// For instance, every time a user navigates to a new path that URL is stored the history stack. History is what lets users navigate your app using the browser's back and forward buttons, even refresh the app while keeping everything in sync. So the history object can also be used to programmatically change the current URL.

// Use refs access the value of the input fields. In React, refs allow you to reference or get direct access to a DOM element. When used on an HTML element, the ref attribute takes a callback function that receives the underlying DOM element as its argument, in our case, both our inputs. These two call backs are executed immediately after the home component is mounted to the DOM. when the inputs are rendered onto the page, they return a reference that we can access with this.name and this.topic.
