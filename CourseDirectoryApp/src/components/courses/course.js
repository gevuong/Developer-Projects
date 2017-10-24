import React from 'react';

const Course = props => (
  <li>
    <p>{ props.title }</p>
    <p>{ props.desc }</p>
    <img src={ props.img }></img>
  </li>
)

export default Course;
