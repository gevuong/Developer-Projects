### Trivia Notes
* Setting up routes allows you to navigate parts of website by manually inputting URL. Setting up links allows you to click on a link to navigate website.
* JS frameworks, like Angular and Ember, come with built-in routing features. React is not a framework, but a library concerned with rendering UI. React is a declarative and modular style of building UIs.
* This app will be a **single page apps (or SPA)**, displayed only on a single web page. The HTML, CSS, and JS are only loaded once on the browser, and content **changes dynamically** as user interacts with app, provides a smoother browsing experience. App never reloads unless user manually refreshes.
* Routing is responsible for matching URL with the set of components being rendered, and loading and unloading content. The router finds components that correspond with, for example, the sign-up URL and loads them on screen.
* A good dependable routing solution should also keep track of **browser history**
to keep the UI in sync with the URL. That way users can navigate the app using the browser's back and forward buttons.
* Routing in single-page apps should work in a way that's consistent with the navigation experience of regular multi-page sites and apps.
* **Routing** is the process of matching a URL to a View, or a set of components being rendered. In single-page apps, **routing dynamically loads components and changes what's displayed in the browser**, as users navigate the app.
**All without reloading the page.**
* React Itself doesn't have built in routing features. So many developer rely on React Router, an external library designed specifically for React.

* Pure or stateless components are simply functions with a render method and no state. These components don't initialize or change the state.

* React Router uses JSX syntax to declare routes. React Router is a set of components, and the declarative syntax of JSX makes it easier to visualize how routes are structured.


* React router passes rendered components information about the current path and URL the route is matching. The component also gets passed a history object that listens for changes to the current URL, keeps tracks of browser history and the number of entries in the history stack. And by history stack I mean previously visited URLs.

* For instance, every time a user navigates to a new path that URL is stored the history stack. History is what lets users navigate your app using the browser's back and forward buttons, even refresh the app while keeping everything in sync. So the history object can also be used to programmatically change the current URL.

* "exact" and "render" are <Route> props. <Route> component is responsible for rendering UI (or other components). React doesn't render any Route components to the DOM, it just manages what's being rendered, you can see when inspecting elements.
// Begin declaring routes with react router by rendering a router that wraps all your app components, in this case <BrowserRouter>. <BrowserRouter> renders the root router which listens to URL changes and provides other react component information about the current URL and, which components to render, that way your UI is always in sync with the URL.

* <BrowserRouter> vs <HashRouter>
* <BrowserRouter> should be used when you have a server that will handle dynamic requests (knows how to respond to any possible URI), while <HashRouter> should be used for static websites (can only respond to requests for files that it knows about).

* BrowserRouter is one of the core components of React Router and keeps UI in sync with URL.

* Usually it is preferable to use a <BrowserRouter>, but if your website will be hosted on a server that only serves static files, then <HashRouter> is a good solution.

* Declarative approach means that React lets you write code that describes the end result. For instance, the route component matches a URL's path and loads a component, without you having to define how it should happen.

* With React Router, any route written in App container will render a child component when its path matches URL.

* This will render both routes because both paths contain "/", so router considers both routes to match URL. You'll need to add "exact path" to instruct Router to render component only if path matches URL exactly.
// <Route path="/" component={ Home } />
// <Route path="/about" component={ About } />
