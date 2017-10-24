import React from 'react';
import { HTMLCourses } from '../../data/courses';

const HTML = () => (
  <div>
    <ul>
    { HTMLCourses.map(course => (
      <li key={ course.id }>
        <p>{ course.title }</p>
        <p>{ course.description }</p>
        <img src={ course.img_src }></img>
      </li>
      )
    )};
    </ul>
  </div>
)

export default HTML;
