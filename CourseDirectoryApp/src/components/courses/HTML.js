import React from 'react';
import { HTMLCourses } from '../../data/courses';
import Course from './course';

const HTML = () => (
  <div>
    <ul>
    { HTMLCourses.map(course => (
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

export default HTML;
