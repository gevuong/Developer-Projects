### This app shows how to fetch external data with React and how to display data in app.

* React is just a view library, and it's only concern is rendering components using state and properties passed to them. React doesn't have a built in way to fetch data from a server. React doesn't know there is a server.
* There are JS methods used to fetch data to React app. Both of the following methods use promise to handle results we get back from the server:
  * Fetch API: A modern replacement for XMLHTTPRequest, it is a data fetching interface that's native to the browser.
  * Axios: Similar to Fetch API, but has unique features. This library isn't specific to React. Node.js app. Supports promiseAPI, and automatically converts data to JSON. Protects against CSRF attacks.

* Difference between e.target and e.currentTarget:
  * The difference becomes apparent when you create delegated handlers. The value of e.target represents the element which caused the event, where e.currentTarget represents the element that the listener is attached to. Event propagation ("bubbling") is responsible for the difference.

  * The one to use will depend on what you want to accomplish. But most commonly, e.target will be the one you want.
