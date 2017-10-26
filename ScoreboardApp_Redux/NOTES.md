### Redux terms:
* Redux: A JavaScript framework for managing and maintaining application state usually used in conjunction with other frameworks to build applications.
* Store: Refers to the application state container for the entire application
* Action: Refers to an explicit event that occurs within a Redux application that will impact application state
* Container: A React component that subscribes to specific Reducer updates and propagates data to other React components known as presentational components
Immutability: Refers to an object that cannot be changed once it has been created.


### Webpack and Babel
* **Webpack dev server stores your modifications and compiled bundles in memory, so they're not automatically written to bundle.js. Which means the code isn't yet saved to the file we'd want to use on our production server. So to embed all your changes into bundle.js at runtime, add the inline option to your start script and package.json.**

* **Style-loader** is going to embed the CSS in bundled.js and the **CSS-loader** parses the CSS and applies it to the DOM.

* You chain loaders in the order you want the transformations to occur by separating them with an exclamation point. So as the value for loader, type style-loader!, then, css-loader. So here style-loader runs first and the output is piped into CSS loader. So the easiest way to run your CSS through the loaders and embed it in the bundle, is to import your style sheet from within your ENTRY file.

* You no longer need to link to the CSS file in index.html because now it's being handled by webpack. Webpack dev server stores your modifications and compiled bundles in memory, so they're not automatically written to bundle.js.

* Which means the code isn't yet saved to the file we'd want to use on our production server. So to embed all your changes into bundle.js at runtime, add the inline option to your start script and package.json. webpack dev server updates your changes in real-time when you use the inline option.

* The --inline option fully reloads your app in the browser, so any time I save changes in my app, I lose all component states. So, as you can see, everything in the app goes back to the initial state. This can be a hassle during development and when editing components. To maintain component states, use webpack plugin **React Hot Loader**.

* **It's important to know that your entry file cannot be hot reloaded. So if I change anything in app.js, it causes a full page reload, and components still lose state. But we can trigger a hot module replacement by breaking the components out into individual modules.**

* Difference between transpiling and compiling is the level of abstraction when converting code from one language to another. For example, compiling is converting a language like Java to bytecode, which converts one language to another at a lower abstraction level. Transpiling is converting a language like SASS to CSS, they are both high level languages that serve the purpose of styling HTML, and at the same abstraction level.
