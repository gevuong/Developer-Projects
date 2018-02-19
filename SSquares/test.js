// setInterval to change backgroundColor of each square to blue.
document.addEventListener("DOMContentLoaded", () => {
  const squares = document.getElementsByClassName("square");
  let stack = [];
  let squares_arr = Array.from(squares);
  let revertColor;

  squares_arr.forEach(square => {
    square.style.backgroundColor = "white";
    square.addEventListener("click", onClick);
  })

  function onClick(event) {
    let clickedSquare = event.currentTarget;
    // console.log("clickedSquare");
    if (clickedSquare.style.backgroundColor === "white") {
      console.log("change blue");
      clickedSquare.style.backgroundColor = "#33C6E4";

      if (!stack.includes(clickedSquare)) {
        stack.push(clickedSquare);
        console.log("enter stack: ", stack);
      }

      if (stack.length === 9) {
        revertColor = setInterval(changeBackgroundColor, 300);
      }

    } else {
      console.log("change white");
      clickedSquare.style.backgroundColor = "white";
    }
  }

  // let changeColor = setInterval(changeBackgroundColor, 300);

  function changeBackgroundColor() {
    console.log("enter changeBackgroundColor");
    let poppedSquare = stack.pop();
    console.log("poppedSquare: ", poppedSquare);
    poppedSquare.style.backgroundColor = "white";
    console.log("stack length: ", stack.length);
    if (stack.length === 0) {
      console.log("clearInterval");
      clearInterval(revertColor);
      revertColor = 0;
    }
  }

})
