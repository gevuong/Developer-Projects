import React from 'react';
import { JSCourses } from '../../data/courses';
import Course from './course';

const JavaScript = () => (
  <div>
    <ul>
      { JSCourses.map(course => (
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

export default JavaScript;
