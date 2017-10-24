import React from 'react';
import { JSCourses } from '../../data/courses';


const JavaScript = () => (

  <div>
    <p> { console.log(JSCourses) }</p>
    <ul>
      { JSCourses.map(course => (
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

export default JavaScript;
