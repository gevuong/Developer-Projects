import React from 'react';
import TeacherLists from '../data/teachers';

const Teachers = () => (
  <div className="main-content">
    <ul className="group">
    { TeacherLists.map(teacher => (
      <li className="teacher" key={ teacher.id }>
        <p>{ teacher.name }</p>
        <p>{ teacher.bio }</p>
        <img src={ teacher.img_src } className="teacher-img" alt="teacher"></img>
      </li>
      )
    )};
    </ul>
  </div>
)

export default Teachers;

// The "alt" attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).
