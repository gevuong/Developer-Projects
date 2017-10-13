// In RSVP app, we won't be sending data to a remote server, and we won't be leaving current page.

// Note: var is function scoping, meaning variables declared inside a function are visible from the outside. let and const are block scoping, meaning those variables are not visible outside of its block.
const form = document.getElementById("registrar");
const input = form.querySelector("[type=text]");
const ul = document.getElementById("invitedList");

// create list element
function createLi(invitee) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = invitee; // replaced li.textContent with span to convert text element to HTML element
  li.appendChild(span);

  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  li.appendChild(label);

  const checkboxInput = document.createElement('input');
  checkboxInput.type = 'checkbox';  label.appendChild(checkboxInput);

  const editButton = document.createElement('button');
  editButton.textContent = 'edit'
  li.appendChild(editButton);

  const removeButton = document.createElement('button');
  removeButton.textContent = "remove";
  li.appendChild(removeButton);

  return li;
}

// In general, a `submit` event type is fired only on the <form> element, when user either clicks Submit or hits Enter.
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent brower's default behavior of sending into to URL and loading that URL when HTML form is submitted.
  if (input.value.length > 0) {
    const invitee = input.value;
    input.value = '';
    const li = createLi(invitee);
    ul.appendChild(li);
  }
});

// Instead of adding an event handler to each checkbox created, add a single delegated event handler to just one element, <ul>. Due to event bubbling, an event that occurs on one element (i.e. checkboxInput) bubbles up to its parent (i.e. <label>) or other ancestors (i.e. <ul>). Due to event delegation, the action of changing className is delegated down to its children, specifically a <li>.

// "Change" event is fired when an <input>, <select>, or <textarea> value has changed.
ul.addEventListener("change", (e) => {
  const checkboxInput = e.target; // references to element that received the event, which is an input element
  const checked = checkboxInput.checked; // returns a boolean
  const li = checkboxInput.parentNode.parentNode; // DOM traversal to <label> then to <li>
  if (checked) {
    li.className = "responded";
  } else {
    li.className = '';
  }
})

// use a single delegated handler on the parent element <ul> to receive the button click event because user may add, edit, and remove lots of names to list.
ul.addEventListener("click", (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target; // references to element that received the event, which is a button element
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.textContent === 'remove') {
      ul.removeChild(li);
    } else if (button.textContent === 'edit') {
      // move list item to an editing state
      const span = li.firstElementChild;
      const editNameInput = document.createElement('input');
      editNameInput.type = 'text';
      editNameInput.value = span.textContent;
      li.replaceChild(editNameInput, span);
        // alternative to li.replaceChild():
        // li.insertBefore(editNameInput,span);
        // li.removeChild(span);
      button.textContent = 'save';
    } else if (button.textContent === 'save') {
      // move list item to a saved state
      const editNameInput = li.firstElementChild;
      const span = document.createElement('span');
      span.textContent = editNameInput.value;
      li.replaceChild(span, editNameInput);
      button.textContent = 'edit';
    }
  }
})

// Function scoping: variables declared outside a function are visible from the inside.
// Event object: is an object provided to an event handler that contains info about the event.
// Inside event handler, 'target' property on event object contains reference to element that received event.
