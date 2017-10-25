import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <span className="icn-logo"><i className="material-icons">Code</i></span>
    <ul className="main-nav">
      <li>
        <NavLink exact to="/" activeStyle={{ background: "tomato" }}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" activeClassName="myCustomClassName">
          About
        </NavLink>
      </li>
      <li><NavLink to="/teachers">Teachers</NavLink></li>
      <li><NavLink to="/foo">Courses</NavLink></li>
    </ul>
  </header>
)

export default Header;

// The <NavLink> component is a special version of <Link> that can change the appearance of a link when it's active. Meaning you are able to style the link. By default NavLink components have a className called "active". Can set to desired className using "activeClassName". Also, can write active style using "activeStyle"

//The NavLink component also lets you assign a custom class name to an active link, if you want to change the default active class name, include the active class name prop, and set it to your desired class name, and you're able to define active styles inline.

// "activeClassName" attribute is used to create a className for link. "activeStyle" allows inline styling of link.
