import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <h2>Course Directory</h2>
      <Route exact path="/" component={ Home } />
      <Route path="/about" component={ About } />
    </div>
  </BrowserRouter>
)

export default App;

// Begin declaring routes with react router by rendering a router that wraps all your app components, in this case <BrowserRouter>. <BrowserRouter> renders the root router which listens to URL changes and provides other react rather component information about the current URL and, which components to render, that way your UI is always in sync with the URL.

// This will render both routes because both paths have "/"
// <Route path="/" component={ Home } />
// <Route path="/about" component={ About } />
