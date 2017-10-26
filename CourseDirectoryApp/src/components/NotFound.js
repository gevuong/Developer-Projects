import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => (
  <div className="main-content not-found">
    <i id="not-found-icon" className="material-icons icn-error" >error_outline</i>
    <h2>404 Error: Page Not Found</h2>
    <h3>Click <NavLink to="/">Here</NavLink> to return Home</h3>
  </div>
)

export default NotFound;
