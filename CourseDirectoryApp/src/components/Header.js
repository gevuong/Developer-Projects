import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <span className="icn-logo"><i className="material-icons">code</i></span>
    <ul className="main-nav">
      <li>
        <NavLink exact to="/" activeStyle={{ background: "tomato" }}>
          Home
        </NavLink>
      </li>
      <li><NavLink to="/about">About</NavLink>
      </li>
      <li><NavLink to="/teachers">Teachers</NavLink></li>
      <li><NavLink to="/foo">Courses</NavLink></li>
    </ul>
  </header>
)

export default Header;

// The <NavLink> component is a special version of <Link> that can change the appearance of a link when it's active. Meaning you are able to style the link. By default NavLink components have a className called "active". Can set to custom className using "activeClassName" prop. Also, can write active style using "activeStyle" prop.
