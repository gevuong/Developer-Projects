// add event listener to wait for document to be loaded before loading canvas el.
// document.addEventListener("DOMContentLoaded", function() {

  const tetri = [];

  const playerElements = document.querySelectorAll(".player");
  [...playerElements].forEach(playerElement => {
    const canvas = playerElement.querySelector("canvas"); // select Canvas element inside player element
    const tetris = new Tetris(canvas);
    tetri.push(tetris);
    console.log(playerElement);
  })

  // CONSTANTS

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

  document.addEventListener("keydown", e => {
    [
      [65, 68, 81, 69, 83], // player1 keys [a, d, q, e, w]
      [72, 75, 89, 73, 74], // player2 keys [h, k, y, i, j]
    ]
    .forEach((key, idx) => {
      const player = tetri[idx].player;
      if (e.keyCode === key[0]) { // arrowRight
        player.move(-1);
      } else if (e.keyCode === key[1]) { // arrowLeft
        player.move(1);
      } else if (e.keyCode === key[2]) {
        player.rotate(-1);
      } else if (e.keyCode === key[3]) {
        player.rotate(1);
      } else if (e.keyCode === key[4]) { // arrowDown
        player.drop();
      }
    })
  });

  // function updateScore() {
  //   document.getElementById("score").innerText = tetris.player.score;
  // }


  // updateScore();
// })
