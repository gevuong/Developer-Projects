// In this app, we won't be sending data to a remote server, and we won't be leaving current page.

const form = document.getElementById("registrar");
const input = form.querySelector("[type=text]");
const ul = document.getElementById("invitedList");

// `submit` event fires when user either clicks Submit or hits Enter on the form element, not `button` or `submit input`.
form.addEventListener("submit", (e) => {
  e.preventDefault(); // without this line, page reloads when HTML form is submitted. Browser sends info to the URL specified by action attribute and loads that URL as well.
  console.log(input.value)
  const li = document.createElement('li');
  li.textContent = input.value;
  input.value = '';
  ul.appendChild(li);

  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  li.appendChild(label);

  const checkboxInput = document.createElement('input');
  checkboxInput.type = 'checkbox';  label.appendChild(checkboxInput);
});

// Instead of adding an event handler to each checkbox created, add a single event handler to just one element, <ul>. Due to event bubbling, an event that occurs on one element (i.e. checkboxInput) bubbles up to its parent (i.e. <label>) or other ancestors (i.e. <ul>).
// Also, "change" event is used instead of "click" to see if checkbox state has changed from unchecked to checked, and vice versa, not so much as to whether the box is clicked.
ul.addEventListener("click", (e) => {
  const checkboxInput = e.target;
  const checked = checkboxInput.checked;
  const listItem = checkboxInput.parentNode.parentNode;
  if (checked) {
    listItem.className = "responded";
  } else {
    listItem.className = '';
  }
})
