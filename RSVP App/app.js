// In this app, we won't be sending data to a remote server, and we won't be leaving current page.

const form = document.getElementById("registrar");
const input = form.querySelector("[type=text]");
const ul = document.getElementById("invitedList");

// create list element
function createLi(invitee) {
  const li = document.createElement('li');
  li.textContent = invitee;

  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  li.appendChild(label);

  const checkboxInput = document.createElement('input');
  checkboxInput.type = 'checkbox';  label.appendChild(checkboxInput);

  const removeButton = document.createElement('button');
  removeButton.textContent = "remove";
  li.appendChild(removeButton);

  return li;
}

// `submit` event fires when user either clicks Submit or hits Enter on the form element, not `button` or `submit input`. Argument, 'e', can be any name.
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents page reloading when HTML form is submitted, in which the browser sends info to URL specified by action attribute and loads that URL as well.
  const invitee = input.value;
  input.value = '';
  const li = createLi(invitee);
  ul.appendChild(li);
});

// Instead of adding an event handler to each checkbox created, add a single event delegated handler to just one element, <ul>. Due to event bubbling, an event that occurs on one element (i.e. checkboxInput) bubbles up to its parent (i.e. <label>) or other ancestors (i.e. <ul>). Due to event delegation, the action is delegated to its children.

// Also, "change" event is used instead of "click" to see if checkbox state has changed from unchecked to checked, and vice versa, not so much as to whether the box is clicked. "Change" event is fired when an <input>, <select>, or <textarea> value has changed.
ul.addEventListener("change", (e) => {
  const checkboxInput = e.target; // returns element that initiated the event, which is the checkbox input element
  const checked = checkboxInput.checked; // returns a boolean
  const listItem = checkboxInput.parentNode.parentNode; // DOM traversal in action
  if (checked) {
    listItem.className = "responded";
  } else {
    listItem.className = '';
  }
})

// use a delegated handler on the parent element to receive the removeButton click event because user may add and remove lots of names to list.
ul.addEventListener("click", (e) => {
  const removeButton = e.target; // returns element that initiated the event, which is the checkbox button element
  if (e.target.textContent === 'remove') {
    const li = removeButton.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
  }
})
