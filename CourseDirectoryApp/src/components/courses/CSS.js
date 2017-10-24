import React from 'react';
import { CSSCourses } from '../../data/courses';

const CSS = () => (
  <div>
    <h3>CSS courses</h3>
    <ul>
    { CSSCourses.map(course => (
        <li key={ course.id }>
          <p>{ course.title }</p>
          <p>{ course.description }</p>
          <img src={ course.img_src }></img>
        </li>
      )
    )}
    </ul>
  </div>
)

export default CSS;
