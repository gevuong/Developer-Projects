// In this app, we won't be sending data to a remote server, and we won't be leaving current page.

const form = document.getElementById("registrar");
const input = form.querySelector("input");
const ul = document.getElementById("invitedList");

// `submit` event fires when user either clicks Submit or hits Enter on the form element, not `button` or `submit input`.
form.addEventListener("submit", (e) => {
  e.preventDefault() // without this line, page reloads when HTML form is submitted. Browser sends info to the URL specified by action attribute and loads that URL as well.
  const li = document.createElement('li');
  li.textContent = input.value;
  ul.appendChild(li);
  input.value = '';
});
