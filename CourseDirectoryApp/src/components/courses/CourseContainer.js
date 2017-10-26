import React from 'react';
import Course from './course';

const CourseContainer = props => (
  <div>
    <ul>
    { props.course.map(course => (
        <Course
          key={ course.id }
          title={ course.title }
          desc={ course.description }
          img={ course.img_src }
        />
      )
    )}
    </ul>
  </div>
)

export default CourseContainer;
