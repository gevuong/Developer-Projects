document.addEventListener("DOMContentLoaded", () => {
  const squares = document.getElementsByClassName("square");
  let stack = [];

  Array.from(squares).forEach(square => {
    square.style.backgroundColor = "white";

    square.addEventListener("click", function(e) {
      const clickedSquare = e.target;
      // console.log(clickedSquare);

      if (clickedSquare.style.backgroundColor === "white") {
        clickedSquare.style.backgroundColor = "#33C6E4";
        // To prevent the same square from adding onto stack
        if (!stack.includes(clickedSquare)) {
          stack.push(clickedSquare);
        }
        console.log("stack: ", stack);
      } else {
        clickedSquare.style.backgroundColor = "white";
      };

      if (stack.length === 9) {
        for (let square = 0; square < stack.length; square++) {
          let poppedSquare = stack.pop();
          console.log("poppedSquare: ", poppedSquare);
          setTimeout(changeBackgroundColor(poppedSquare), 300);
        };
      }

    });

  });

  window.stack = stack;

  function changeBackgroundColor(square) {
    square.style.backgroundColor = "white";
  };

});
