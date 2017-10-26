import React from 'react';
import TeacherLists from '../data/teachers';

const Teachers = () => (
  <div className="main-content">
    <h2>Teachers</h2>
    
    <ul className="group">
    { TeacherLists.map(teacher => (
      <li className="teacher" key={ teacher.id }>
        <h3>{ teacher.name }</h3>
        <p>{ teacher.bio }</p>
        <img src={ teacher.img_src } className="teacher-img" alt="teacher" />
      </li>
      )
    )};
    </ul>
  </div>
)

export default Teachers;

// The "alt" attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader).

// alternative method
// const Teachers = () => {
//   let teachers = TeacherList.map((teacher) => {
//     return (
//       <li className="teacher" key={teacher.id} >
//         <img className="teacher-img" src={teacher.img_src} alt="teacher" />
//         <h3>{teacher.name}</h3>
//         <p>{teacher.bio}</p>
//       </li>
//     );
//   });
//
//   return (
//     <div className="main-content">
//       <h2>Teachers</h2>
//       <ul className="group">
//         {teachers}
//       </ul>
//     </div>
//   );
// }
