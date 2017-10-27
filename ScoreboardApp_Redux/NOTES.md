### Trivia Notes
* React-Redux library provides a number of helper methods that make it easier to connect Redux to your React app.
* A good pattern to follow when building components is to start with components that have no dependency on other components and work backwards from there.
* Modules are easy to create and maintain, make testing, debugging, and scaling an app easier, and can be imported or exported into another app. Breaking React components into modules provides separation of UI responsibilities and better scalability.

**Immutability is one of the key principles of Redux, which is achieved by implementing reducers as pure functions that do not mutate state**.

### Submitting an action to Redux
* An action creator generates an action. The action is dispatched to Redux store. The store holds your app state and it's where a reducer handles the action. The reducer passes action to a component and returns a new state.
* With Redux, you are not required to separate your React components into their own files.


### Redux terms:
* Redux: A JavaScript framework for managing and maintaining application state usually used in conjunction with other frameworks to build applications. Can make your app robust, scalable, and maintainable. It offers data governance, data tracking, and data is universally accessible to all parts of your application.
* Store: Refers to the application state container for the entire application
* Action: Refers to an explicit event that occurs within a Redux application that will impact application state
* Container: A React component that subscribes to specific Reducer updates and propagates data to other React components known as presentational components
Immutability: Refers to an object that cannot be changed once it has been created.

* Reducer: A Redux construct that is responsible for maintaining a specific portion of the Redux store. In JavaScript, a reducer is implemented as a pure function that takes two arguments, the current state and the action being taken, and produces the next state. In order for Redux to work properly, Reducers must not mutate the current state. In other words, the state for a reducer must be treated as immutable.
* Action Type: An action type in Redux represents an explicit action type that will occur within the application. It is expressed in JavaScript as a string constant.
* Actions: Explicit events that occur in our application represented by a type and any relevant metadata associated with the action. In other words, an event that Redux uses to determine how app state will be affected. 
* Action Creators: In Redux, a construct for generating an action.

* Redux store: A single source of truth for app state.

### More terms:
* Container Component: A container component is concerned with how things work. It interacts with and receives data from the object storing the entire state of your application. It's a container component's responsibility to propagate data down to the presentational components. So instead of containing markup of its own, a container simply provides the data and behavior to presentational components and renders them.
* Presentational Component: A type of component that's concerned with how things look. A presentational component behaves exactly like any other React component in that it just renders HTML and doesn't care if we use Redux at all. As long as it receives prop data as it expects, it will render the same.
* There are two types of presentational components, logical and pure.

* Logical Component: React components that manages own state and may or may not make use of React lifecycle events
* Pure Component: Presentation component is stateless, implemented as pure functions that do not manage their own state, and do not use React life cycle events. They rely solely on props.
* Component Hierarchy: A composition of React components represented as a tree that depicts the component structure.

### When to use Redux
* For simple React apps that only use minimal React components, Redux can be overkill. Make sure your app will benefit from using Redux.
* **Provides a single source of truth for your app called Redux store. Making it easier to keep your application state in sync, and distribute state data in a predictable and deterministic way.**
* When you use Redux with React, both align themselves almost perfectly. Redux handles all your data management while React only manages the presentation and the use of your app.
* Redux is considered to be an opinionated framework, meaning that Redux expects you to implement features a specific way. Otherwise, your app will not work as you would expect. This is good for a couple of reasons.
* First, developers familiar with Redux will understand structure of other apps using Redux.
* Second, consistent design patterns make debugging and testing your application much easier because application responsibilities are distinct and isolated.


### Webpack and Babel
* **Webpack dev server stores your modifications and compiled bundles in memory, so they're not automatically written to bundle.js. Which means the code isn't yet saved to the file we'd want to use on our production server. So to embed all your changes into bundle.js at runtime, add the inline option to your start script and package.json.**

* **Style-loader** is going to embed the CSS in bundled.js and the **CSS-loader** parses the CSS and applies it to the DOM.

* You chain loaders in the order you want the transformations to occur by separating them with an exclamation point. So as the value for loader, type style-loader!, then, css-loader. So here style-loader runs first and the output is piped into CSS loader. So the easiest way to run your CSS through the loaders and embed it in the bundle, is to import your style sheet from within your ENTRY file.

* You no longer need to link to the CSS file in index.html because now it's being handled by webpack. Webpack dev server stores your modifications and compiled bundles in memory, so they're not automatically written to bundle.js.

* Which means the code isn't yet saved to the file we'd want to use on our production server. So to embed all your changes into bundle.js at runtime, add the inline option to your start script and package.json. webpack dev server updates your changes in real-time when you use the inline option.

* The --inline option fully reloads your app in the browser, so any time I save changes in my app, I lose all component states. So, as you can see, everything in the app goes back to the initial state. This can be a hassle during development and when editing components. To maintain component states, use webpack plugin **React Hot Loader**.

* It's important to know that **your entry file cannot be hot reloaded. So if you change anything in app.js, it causes a full page reload, and components still lose state.** But we can trigger a hot module replacement by breaking the components out into individual modules.

* Difference between transpiling and compiling is the level of abstraction when converting code from one language to another. For example, compiling is converting a language like Java to bytecode, which converts one language to another at a lower abstraction level. Transpiling is converting a language like SASS to CSS, they are both high level languages that serve the purpose of styling HTML, and at the same abstraction level.
