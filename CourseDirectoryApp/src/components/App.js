import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Header from './Header';
import Teachers from './Teachers';
import Courses from './Courses';
import coursesData from '../data/courses';
import teachersData from '../data/teachers';
import NotFound from './NotFound';
import Featured from './Featured';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      {/* Switch only renders the first route that matches URL */}
      <Switch>
        <Route exact path="/" component={ Home } />
        {/*inline "render" allows props to pass to component, which allows rendering of dynamic content */}
        <Route path="/about" render={ () => <About title="About" /> } />
        <Route exact path="/teachers" component={ Teachers } />
        <Route path="/teachers/:topic/:fname-:lname" component={ Featured } />
        <Route path="/foo" component={ Courses } />
        <Route component={ NotFound } /> {/* Renders if no path matches URL */}
      </Switch>
    </div>
  </BrowserRouter>
)

export default App;
