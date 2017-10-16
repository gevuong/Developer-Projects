### Trivia Notes
* Remember, React keeps a copy of the previous Virtual DOM. A unique key is required to help React understand which object maps to which virtual DOM element. So if item in list is rearranged, added, or deleted, React can use key to reorder list as opposed to changing the content for each DOM Node (or item) based on position in list.

* Cannot use JS for loop to iterate over items inside JSX expression. Need to use .map(), which creates a list of JSX elements from an array of JS values.

* Any stateless functional component can be written as a Component class.

* Break component into smaller components when component has too much markup, a component does too many things, or when component is reused.

* State is data in app that can change. React is a library for writing UI, it is encouraged to use other libraries to help with AJAX, persistence, or managing state. To manage application state. a popular design pattern, Flux, consolidates state for easier management. Redux library implements the Flux pattern.

* All React components, declared as a function or class, must act like pure functions with respect to their props. A "pure" function does not change its inputs, and always return same result for the same input.

* A React component must return a single Virtual DOM element. This is why we wrap all other elements in a single <div> element.

* JSX is an extension to JS that allows us to use XML syntax to build React.createElement calls. JSX is not required for using React, and is convenient when you don't want to setup a compiler in build environment. JSX provides syntactic sugar for React.createElement(comp, props, children) function. So anything you do with JSX can also be done in plain JS. JSX is not the same as HTML in JS files.

* Babel is a JS compiler used to translate JSX files into standard JavaScript.

* Styles of programming:
**Declarative**: A programming model where we describe the result we want to achieve, and not the steps. HTML is declarative, using a markup language to describe layout of page. React provides a declarative way to build UI. We write a description of markup we want, but we don't need to assemble the pieces or update them ourselves.

**Imperative**: A programming model where we describe the process and steps needed to achieve result. Most of JS we write is imperative, modifying variables and calling functions one step at a time.

* Component: A self-contained, reusable piece of our interface.
* DOM (Document Object Model): Interface for managing elements in HTML page.
* Virtual DOM: A pure JS representation of DOM tree and its elements.

* When React renders code to real DOM, it translates virtual DOM elements into real DOM elements on the page.

* React is performant because it keeps virtual DOM representation from last time component was rendered. Then when it wants to re-render, compares the two virtual DOMs, previous and current, and figures out minimal changes needed to update the real DOM tree.

* Wrap JSX expression in curly braces to change to plain old JS. It has to be an JS expression wrapped in curly braces. An expression is something that returns a value.

### Steps to setup React:
1. npm init -y (the directory name needs to not have spaces)
2. npm install --save webpack react react-dom babel-core babel-loader babel-preset-es2015 babel-preset-react
3. Create webpack.config.js and include the webpack snippet
4. npm install
5. Add <script src="bundle.js"></script> to index.html
6. webpack --w
7. Write code to test ReactDOM.render() using event handler and 'DOMContentLoaded' event type, and open index.html
