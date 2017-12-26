// add event listener to wait for document to be loaded before loading canvas el.
// document.addEventListener("DOMContentLoaded", function() {

  const tetri = [];

  const playerElements = document.querySelectorAll(".player");
  [...playerElements].forEach(playerElement => {
    const tetris = new Tetris(playerElement);
    tetri.push(tetris);
  })

  // CONSTANTS
  const keyListener = (e) => {
    [
      [65, 68, 87, 83], // player1 keys [a, d, q, e, s]
      // [72, 75, 89, 73, 74], // player2 keys [h, k, y, i, j]
      [37, 39, 38, 40], // player2 keys [h, k, y, i, j]
    ]
    .forEach((key, idx) => {
      const player = tetri[idx].player;
      console.log(e.keyCode);
      if (e.type === 'keydown') {
        if (e.keyCode === key[0]) { // arrowRight
          player.move(-1);
        } else if (e.keyCode === key[1]) { // arrowLeft
          player.move(1);
        } else if (e.keyCode === key[2]) {
          player.rotate(-1);
        }
        // else if (e.keyCode === key[3]) {
        //   player.rotate(1);
        // }
      }

      // allows both drop keys to work when pressed simultaneously
      if (e.keyCode === key[3]) { // arrowDown
        if (e.type === 'keydown') {
          if (player.dropInterval !== player.DROP_FAST) {
            player.drop();
            player.dropInterval = player.DROP_FAST;
          }
        } else {
          player.dropInterval = player.DROP_SLOW;
        }
      }
    })
  }

  document.addEventListener("keydown", keyListener);
  document.addEventListener("keyup", keyListener);
// })
