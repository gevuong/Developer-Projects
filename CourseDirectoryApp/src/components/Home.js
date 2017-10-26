import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Featured from './Featured';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // This is how to change routes programmatically based on user input submitted in <form> element
  handleSubmit(e) {
    e.preventDefault();
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
        <p>Learn front end web development and much more! This simple directory app offers a preview of our course library. Choose from many hours of content, from HTML to CSS to JavaScript. Learn to code and get the skills you need to launch a new career in front end web development.</p>
        <hr />

        <h3>Featured Teachers</h3>
        <Link to="/teachers/HTML/Janet-Smith">Janet Smith</Link>
        <Link to="/teachers/CSS/Guil-Hernandez">Guil Hernandez</Link>
        <hr />

        <form onSubmit={this.handleSubmit}>
          <h3>Input Teacher and Topic below to search</h3>
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

// Use refs access the value of the input fields. In React, refs allow you to reference or get direct access to a DOM element. When used on an HTML element, the ref attribute takes a callback function that receives the underlying DOM element as its argument, in our case, both our inputs. These two call backs are executed immediately after the home component is mounted to the DOM. when the inputs are rendered onto the page, they return a reference that we can access with this.name and this.topic.
