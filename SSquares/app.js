document.addEventListener("DOMContentLoaded", () => {
  const squares = document.getElementsByClassName("square");
  let stack = [];

  Array.from(squares).forEach(square => {
    square.addEventListener("click", (e) => {
      const clickedSquare = e.target;
      console.log(clickedSquare);
      // if (!stack.includes(clickedSquare)) {
      //   stack.push(clickedSquare);
      // }
      if (clickedSquare.style.backgroundColor === "white") {
        clickedSquare.style.backgroundColor = "#33C6E4";
        stack.push(clickedSquare);
        console.log("stack: ", stack);
      } else {
        clickedSquare.style.backgroundColor = "white";
      };
    });
  });

});
