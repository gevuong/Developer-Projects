import React from 'react';

const Course = props => (
  <li className="course-media-group">
    <img className="course-img" src={ props.img } alt="course" />
      <h3>{ props.title }</h3>
      <p>{ props.desc }</p>
  </li>
)

export default Course;
