import React from 'react';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import HTMLCourses from './courses/HTML';
import CSSCourses from './courses/CSS';
import JavaScriptCourses from './courses/JavaScript';

const Courses = () => (
  <div className="main-content courses">
    <div className="course-header group">
      <h2>Courses</h2>
      <ul className="course-nav">
        <li><NavLink to="/courses/html">HTML</NavLink></li>
        <li><NavLink to="/courses/css">CSS</NavLink></li>
        <li><NavLink to="/courses/javascript">JavaScript</NavLink></li>
      </ul>
    </div>

    {/* Write routes here */}
    <Route path="/courses/html" component={ HTMLCourses } />
    <Route path="/courses/css" component={ CSSCourses } />
    <Route path="/courses/javascript" component={ JavaScriptCourses } />
  </div>
)

export default Courses;
