Steps to setup React:
1. npm init -y (the directory name needs to not have spaces)
2. npm install --save webpack react react-dom babel-core babel-loader babel-preset-es2015 babel-preset-react
3. Create webpack.config.js and include the webpack snippet
4. npm install
5. Add <script src="bundle.js"></script> to index.html
6. webpack --w
7. Write code to test ReactDOM.render() using event handler and 'DOMContentLoaded' event type, and open index.html


* Styles of programming:
**Declarative**: A programming model where we describe the result we want to achieve, and not the steps. HTML is declarative, using a markup language to describe layout of page. React provides a declarative way to build UI. We write a description of markup we want, but we don't need to assemble the pieces or update them ourselves.
**Imperative**: A programming model where we describe the process and steps needed to achieve result. Most of JS we write is imperative, modifying variables and calling functions one step at a time.
* Component: A self-contained, reusable piece of our interface.
* DOM (Document Object Model): Interface for managing elements in HTML page.
* Virtual DOM: A pure JS representation of DOM tree and its elements.

* When React renders code to real DOM, it translates virtual DOM elements into real DOM elements on the page.

* React is performant because it keeps virtual DOM representation from last time component was rendered. Then when it wants to re-render, compares the two virtual DOMs, previous and current, and figures out minimal changes needed to update the real DOM tree.
