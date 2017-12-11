// add event listener to wait for document to be loaded before loading canvas el.
// document.addEventListener("DOMContentLoaded", function() {
  // CONSTANTS
  const canvasEl = document.getElementById("tetris");
  const board = new Board(12, 20); // 12 units wide, 20 units high
  const player = new Player;
  const tetris = new Tetris(canvasEl);

  // create block types
  function createPiece(type) {
    if (type === "T") {
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ]
    } else if (type === "S") {
      return [
        [0, 2, 2],
        [2, 2, 0],
        [0, 0, 0]
      ]
    } else if (type === "L") {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3]
      ]
    } else if (type === "I") {
      return [
        [0, 4, 0, 0],
        [0, 4, 0, 0], // easier to anticipate rotation if in 4x4
        [0, 4, 0, 0],
        [0, 4, 0, 0]
      ]
    } else if (type === "Z") {
      return [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0]
      ]
    } else if (type === "J") {
      return [
        [0, 6, 0],
        [0, 6, 0],
        [6, 6, 0]
      ]
    } else if (type === "O") {
      return [
        [7, 7],
        [7, 7]
      ]
    }
  }

  document.addEventListener("keydown", function(e) {
    if (e.keyCode === 39) { // arrowRight
      player.move(1);
    } else if (e.keyCode === 37) { // arrowLeft
      player.move(-1);
    } else if (e.keyCode === 40) { // arrowDown
      player.drop();
    } else if (e.keyCode === 81) {
      player.rotate(-1);
    } else if (e.keyCode === 87) {
      player.rotate(1);
    }
  });


  function updateScore() {
    document.getElementById("score").innerText = player.score;
  }

  updateScore();
// })
