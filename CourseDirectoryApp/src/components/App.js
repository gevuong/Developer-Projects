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
        <Route path="/about" render={ () => <About title="About Me" /> } />
        <Route exact path="/teachers" component={ Teachers } />
        <Route path="/teachers/:topic/:fname-:lname" component={ Featured } />
        <Route path="/foo" component={ Courses } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App;
// "exact" and "render" are <Route> props. <Route> component is responsible for rendering UI (or other components). React doesn't render any Route components to the DOM, it just manages what's being rendered, you can see when inspecting elements.
// Begin declaring routes with react router by rendering a router that wraps all your app components, in this case <BrowserRouter>. <BrowserRouter> renders the root router which listens to URL changes and provides other react rather component information about the current URL and, which components to render, that way your UI is always in sync with the URL.

// <BrowserRouter> vs <HashRouter>
// <BrowserRouter> should be used when you have a server that will handle dynamic requests (knows how to respond to any possible URI), while <HashRouter> should be used for static websites (can only respond to requests for files that it knows about).

// BrowserRouter is one of the core components of React Router and keeps UI in sync with URL.

// Usually it is preferable to use a <BrowserRouter>, but if your website will be hosted on a server that only serves static files, then <HashRouter> is a good solution.

// Declarative approach means that React lets you write code that describes the end result. For instance, the route component matches a URL's path and loads a component, without you having to define how it should happen.

// With React Router, any route written in App container will render a child component when its path matches URL.

// This will render both routes because both paths contain "/", so router considers both routes to match URL. You'll need to add "exact path" to instruct Router to render component only if path matches URL exactly.
// <Route path="/" component={ Home } />
// <Route path="/about" component={ About } />
