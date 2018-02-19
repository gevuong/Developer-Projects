// Example of defensive programming: Using DOMContentLoaded event allows script tag to be placed elsewhere in index.html. Browser loads JS code, but waits until DOM Content is parsed and loaded before running JS code against it.
document.addEventListener("DOMContentLoaded", () => {
  const squares = document.getElementsByClassName("square"); // returns HTMLCollection, not NodeList or Array
  let stack = [];

  // Convert HTMLCollection to Array to iterate through each square
  Array.from(squares).forEach(square => {

    // initialize backgroundColor to white for each square
    square.style.backgroundColor = "white";
    square.addEventListener("click", event => {
      const clickedSquare = event.currentTarget;
      console.log("clickedSquare: ", clickedSquare);
      if (clickedSquare.style.backgroundColor === "white") {
        clickedSquare.style.backgroundColor = "#33C6E4";

        // To prevent same square from adding onto stack
        if (!stack.includes(clickedSquare)) {
          stack.push(clickedSquare);
        }
        console.log("stack: ", stack);
        // setInterval(changeBackgroundColor(stack), 3000);

      } else {
        clickedSquare.style.backgroundColor = "white";
      };

      if (stack.length === 9) {
        console.log("enter stack length");
        // while (stack.length > 0) {
          setInterval(changeBackgroundColor(stack), 3000);
        // }
      }

    });
  })

  function changeBackgroundColor(stack) {
    let poppedSquare = stack.pop();
    console.log(`changeBackgroundColor of ${stack.length}`);
    poppedSquare.style.backgroundColor = "white";
  }


  function removeListener() {
    Array.from(squares).forEach(square => {
      square.removeEventListener("click", function() {
        return;
      })
    })
  }
});
