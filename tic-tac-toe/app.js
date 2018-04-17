document.addEventListener("DOMContentLoaded", () => {
    const mainDiv = document.getElementById("main");
    const squares = document.getElementsByClassName("square");
    const squaresArray = Array.from(squares);

    let currentMark = "x";
    let boardStatus = [];

    squaresArray.forEach(square => {
        square.addEventListener("click", handleClick)
    })

    function handleClick(e) {
        let clickedSquare = e.currentTarget;

        if (e.target.innerHTML === "") {
            e.target.innerHTML = currentMark;
            currentMark = (currentMark === "x" ? "o" : "x");
            // boardStatus.push(currentMark);
            // console.log("boardStatus: ", boardStatus);
        }
    }


});
