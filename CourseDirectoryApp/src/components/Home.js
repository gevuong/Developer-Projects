import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  function handleSubmit(e) {
    e.preventDefault();

  }
  return (
    <div className="main-content home">
      <h2>Front End Course Directory</h2>
      <hr />
      <h3>Featured Teachers</h3>
      <Link to="/teachers/HTML/Tom-Ford">Tom Ford</Link>
      <Link to="/teachers/CSS/Guil-Hernandez">Guil Hernandez</Link>
      <hr />
      <form>Fill out form below
        <div>
        <input type="text" placeholder="name"></input>
        <input type="text" placeholder="topic"></input>
        </div>
      </form>
    </div>
  )
}

export default Home;
