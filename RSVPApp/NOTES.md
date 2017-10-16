### Notes:
* Defensive programming: A defensive design to ensure continuing function of a piece of software under unforeseen circumstances. Used where high availability, safety or security is needed. (i.e. moving script tag around in index.html)
* JS functions are first-class citizens: functions can be passed into other functions, assigned to variables, and even be stored in arrays and objects.
* Array.from() creates a new Array instance from an array-like object.
* Function scoping: variables declared outside a function are visible from the inside.
* Event object: is an object provided to an event handler that contains info about the event.
* Inside event handler, 'target' property on event object contains reference to element that received event.
* Generally, it is best to place script tag at bottom just before closing body tag to load HTML and CSS before app.js. On slow connections, users are able to see the app sooner, rather than staring at a blank page while JS loads.
