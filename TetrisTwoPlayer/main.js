// add event listener to wait for document to be loaded before loading canvas el.
// document.addEventListener("DOMContentLoaded", function() {

  const tetri = [];

  const playerElements = document.querySelectorAll(".player");
  [...playerElements].forEach(playerElement => {
    const tetris = new Tetris(playerElement);
    tetri.push(tetris);
  });

  // CONSTANTS
  const keyListener = e => {
    [
      [65, 68, 87, 83], // player1 keys [a, d, w, s]
      [37, 39, 38, 40, 32], // player2 keys [left, right, up, down, spacebar]
    ]
    .forEach((key, idx) => {
      const player = tetri[idx].player;
      if (e.type === 'keydown') {
        if (e.keyCode === key[0]) { // arrowRight
          player.move(-1);
        } else if (e.keyCode === key[1]) { // arrowLeft
          player.move(1);
        } else if (e.keyCode === key[2]) {
          player.rotate(-1);
        } else if (e.keyCode === key[4]) {
          console.log(e.keyCode);
          // while (!player.board.collide(player)) {
          //   player.dropInterval = player.DROP_FAST;
          // }
        }
      }

      // allows both drop keys to work when pressed simultaneously
      if (e.keyCode === key[3]) { // arrowDown
        if (e.type === 'keydown') {
          player.score += 1;
          if (player.dropInterval !== player.DROP_FAST) {
            // player.score += 1; // player scores pts for manually dropping piece at a faster pace
            player.drop();
            player.dropInterval = player.DROP_FAST;
          }
        } else {
          player.dropInterval = player.DROP_SLOW;
        }
      }
    });
  };

  document.addEventListener("keydown", keyListener);
  document.addEventListener("keyup", keyListener);
// })
