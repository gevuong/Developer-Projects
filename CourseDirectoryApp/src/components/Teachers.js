import React from 'react';
import TeacherList from '../data/teachers';

const Teachers = () => (
  <div>
    <ul>
    { TeacherList.map(teacher => (
      <li key={ teacher.id }>
        <p>{ teacher.name }</p>
        <p>{ teacher.bio }</p>
        <img src={ teacher.img_src } className="teacher-img"></img>
      </li>
      )
    )};
    </ul>
  </div>
)

export default Teachers;
