// In RSVP app, we won't be sending data to a remote server, and we won't be leaving current page.

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
  const invitee = input.value;
  input.value = '';
  const li = createLi(invitee);
  ul.appendChild(li);
});

// Instead of adding an event handler to each checkbox created, add a single delegated event handler to just one element, <ul>. Due to event bubbling, an event that occurs on one element (i.e. checkboxInput) bubbles up to its parent (i.e. <label>) or other ancestors (i.e. <ul>). Due to event delegation, the action of changing className is delegated down to its children, specifically a <li>.

// "Change" event is fired when an <input>, <select>, or <textarea> value has changed.
ul.addEventListener("change", (e) => {
  const checkboxInput = e.target; // returns element that initiated the event, which is an input element
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
    const button = e.target; // returns element that initiated the event
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.textContent === 'remove') {
      ul.removeChild(li);
    } else if (button.textContent === 'edit') {
      const span = li.firstElementChild;
      const editNameInput = document.createElement('input');
      editNameInput.type = 'text';
      li.replaceChild(editNameInput, span);
      // li.appendChild(editNameInput);
    }
  }
})

// ul.addEventListener("click", (e) => {
//   const editSaveButton = e.target;
//   const li = editSaveButton.parentNode;
//   if (editSaveButton.textContent === 'edit') {
//     editSaveButton.textContent = 'save';

//   }
// })
