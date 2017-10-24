import React from 'react';
import { CSSCourses } from '../../data/courses';
import Course from './course';

const CSS = () => (
  <div>
    <ul>
    { CSSCourses.map(course => (
        <Course
          key={ course.id }
          title={ course.title }
          desc={ course.description }
          img={ course.img_src }
        />
      )
    )};
    </ul>
  </div>
)

export default CSS;
