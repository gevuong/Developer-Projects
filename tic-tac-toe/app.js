document.addEventListener("DOMContentLoaded", () => {
    const mainDiv = document.getElementById("main");
    const squares = document.getElementsByClassName("square");
    const squaresArray = Array.from(squares);
    let current = "x";

    squaresArray.forEach(square => {
        square.addEventListener("click", (e) => {
            console.log("innerHTML: ", e.target);
            console.log("innerHTML: ", e.target.innerHTML);
            if (e.target.innerHTML === "") {
                e.target.innerHTML = current;
                current = (current === "x" ? "o" : "x");
            }
        })
    })
});
