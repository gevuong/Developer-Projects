// Example of defensive programming: Using DOMContentLoaded event allows script tag to be placed elsewhere in index.html. Browser loads JS code, but waits until DOM Content is parsed and loaded before running JS code against it.
document.addEventListener("DOMContentLoaded", () => {
  const squares = document.getElementsByClassName("square"); // returns HTMLCollection, not NodeList or Array
  let stack = [];
  let squares_arr = Array.from(squares);   // Convert HTMLCollection to Array to iterate through each square
  let revertColor;

  squares_arr.forEach(square => {
    // initialize backgroundColor to white for each square
    square.style.backgroundColor = "white";
    square.addEventListener("click", handleClick);
  })

  function handleClick(event) {
    let clickedSquare = event.currentTarget;
    // console.log("clickedSquare");
    if (clickedSquare.style.backgroundColor === "white") {
      console.log("change blue");
      clickedSquare.style.backgroundColor = "#33C6E4";
        // To prevent same square from adding onto stack
      if (!stack.includes(clickedSquare)) {
        stack.push(clickedSquare);
        console.log("push to stack: ", stack);
      }

      if (stack.length === 9) {
        console.log("setInterval");
        revertColor = setInterval(makeBackgroundWhite, 300);
      }

    } else {
      console.log("change white");
      clickedSquare.style.backgroundColor = "white";
    }
  }

  // let changeColor = setInterval(makeBackgroundWhite, 300);

  function makeBackgroundWhite() {
    console.log("enter makeBackgroundWhite");
    let poppedSquare = stack.pop();
    poppedSquare.style.backgroundColor = "white";
    console.log("stack length: ", stack.length);
    if (stack.length === 0) {
      console.log("clearInterval");
      clearInterval(revertColor);
      removeListener();
      revertColor = 0;
    }
  }

  function removeListener() {
    squares_arr.forEach(square => {
      square.removeEventListener("click", handleClick)
    })
  }
})
