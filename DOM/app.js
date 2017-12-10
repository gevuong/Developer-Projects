// getElementById method belongs to the document object
const myHeading = document.getElementsByTagName("h1")[0];
const myTextInput = document.getElementById("myTextInput");
const myButton = document.getElementById("myButton");
const resetHeading = document.getElementById("resetHeading");
const myBackgroundInput = document.getElementById("myBackgroundInput");
const buttonBackground = document.getElementById('buttonBackground');
const toggleList = document.getElementById('toggleListButton');
const listDiv = document.getElementsByClassName('listDiv')[0];
const listItems = document.querySelectorAll('li');
const nonPurpleItems = document.getElementsByClassName('not-purple');
const changeListInput = document.querySelector('input.description');
const listParagraph = document.querySelector('p.description');
const changeListButton = document.querySelector('button.description');
// li:nth-child is a CSS pseudo class selector
const evens = document.querySelectorAll('li:nth-child(even)');
const addItemInput = document.getElementById('addItemInput');
const addItemButton = document.getElementById('addItemButton');
const removeItemButton = document.getElementById('removeItemButton');

changeListButton.addEventListener('click', () => {
  if (changeListInput.value === "") {
    return;
  } else {
  listParagraph.innerHTML = changeListInput.value + ':';
  changeListInput.value = '';
  }
})

// test to show how an attribute can be set in JS. But better to do so in index.html.
listParagraph.title = 'List description';

myHeading.addEventListener('click', function() {
  if (myHeading.style.color === 'red') {
    myHeading.style.color = 'black';
  } else {
    myHeading.style.color = 'red';
  }
});

myButton.addEventListener('click', () => {
  myHeading.style.color = myTextInput.value;
})

resetHeading.addEventListener('click', () => {
  myHeading.style.color = 'black';
})

buttonBackground.addEventListener('click', () => {
  myHeading.style.backgroundColor = myBackgroundInput.value;
})

toggleList.addEventListener('click', () => {
  if (listDiv.style.display === 'none') {
    toggleList.textContent = 'Hide List';
    listDiv.style.display = 'block';
  } else {
    toggleList.textContent = 'Show List';
    listDiv.style.display = 'none';
  };
})

for (let item = 0; item < listItems.length; item++) {
  listItems[item].style.color = 'purple';
}

for (let item = 0; item < nonPurpleItems.length; item++) {
  nonPurpleItems[item].style.color = 'orange';
}

for (let item = 0; item < evens.length; item++) {
  evens[item].style.backgroundColor = 'lightgray';
}

// Nodes belong to the DOM, while elements are plain HTML
addItemButton.addEventListener('click', () => {
  let ul = document.getElementsByTagName('ul')[0];
  let li = document.createElement('li');
  li.textContent = addItemInput.value;
  if (li.textContent === '') {
    return;
  } else {
    ul.appendChild(li);
    addItemInput.value = '';
  }
})

removeItemButton.addEventListener('click', () => {
  let ul = document.querySelector('ul');
  let li = document.querySelector('li:last-child');
  ul.removeChild(li);
})
