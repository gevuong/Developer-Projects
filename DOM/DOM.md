###What is the DOM?

- DOM stands for Document Object Model, and it is a representation of a webpage that JavaScript can use to navigate and make changes to a web page.

- Just like a city map is a model of a city that helps you get around town, the DOM is a map of a webpage that JavaScript can use to navigate and make changes to a web page. However, unlike a city map, changes that JavaScript makes to the DOM alter the web page. Imagine if drawing a street on a map made that street appear in real life. Well, that's kind of how it works in the browser.

- The **document** is a **global object** (which is a property of the window object) representing HTML and content of a web page. With JS, you can select and change different parts of the webpage by interacting with the document object.

- The DOM represents a web page as a **family tree-like structure**. In a HTML webpage, you have a head and a body. Nested inside those, you have other elements. The head contains a title element, and the body contains heading, paragraph, `ul` elements, etc., and a `ul` element would have `li` elements inside. These nested elements can all be thought of as a tree.

- The document element, or node, would be the **root node** of the family tree. The head and body nodes sprout like branches leading to other branches. The leaves of a tree, like a heading element or list item nodes, represent the most deeply nested tags of an HTML page.

- The body is the parent of the `h1`, `p` and `ul` nodes. The `li` nodes are all children of the `ul` node. And the `li` nodes are all siblings of each other. JavaScript is going to use these family relationships and this tree-like model to understand and alter the structure of webpages.


###Basic Tasks JS can do with the DOM
1. Selecting elements: Selection is a way to identify an element for a browser, so the browser can find it and make it available for us to do something with it using JS.
2. Read or manipulating elements
3. Respond and listen to user event or actions


### Defining Variables
- `const` should be your first choice in declaring variables. Use const to store numbers that shouldn't change while your program runs. You'll use `const` when selecting an element on a page, or when assigning a function to a variable.

- `const` is used to prevent reassignment bugs and to help debug your code faster. const has block level scoping. A block of code is anything between curly braces.

- `const` doesn't prevent arrays and objects from being modified. `const` just prevents them from being reassigned or overwritten completely.

```
const days = ['Monday'];
days.push('Tuesday');
days // => ['Monday', 'Tuesday']

const person = {first_name: 'Imogen'};
person.last_name = "Heap";
person // => {first_name: 'Imogen', last_name: 'Heap'}
```

- For a variable whose value will change during the life of a program, `const` would be a bad choice. For example, you wouldn't want to use `const` to store a score of a game, since the score changes as the player plays the game. In that case, use the `let` keyword.

- `let` works just like `var`, allowing you to reassign variables. But unlike `var`, it has block-level scoping. For example, when incrementing an index in a for loop, using `let i = 0` means the i variable is localized to each cycle of the for loop. In other words, the i variable is distinct for each cycle through the for loop.

- `var` usage should be avoided, since there are a number of scoping issues associated with the `var` keyword.
