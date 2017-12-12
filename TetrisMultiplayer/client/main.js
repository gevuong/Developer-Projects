// add event listener to wait for document to be loaded before loading canvas el.
// document.addEventListener("DOMContentLoaded", function() {
const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add('local'); // add class name
localTetris.run();

const connectionManager = new ConnectionManager(tetrisManager);
connectionManager.connect('ws://localhost:9000');

  const keyListener = e => {
    [
      [65, 68, 81, 69, 83], // player1 keys [a, d, q, e, w]
      [72, 75, 89, 73, 74], // player2 keys [h, k, y, i, j]
    ]
    .forEach((key, idx) => {
      const player = localTetris.player;
      if (e.type === 'keydown') {
        if (e.keyCode === key[0]) { // arrowRight
          player.move(-1);
        } else if (e.keyCode === key[1]) { // arrowLeft
          player.move(1);
        } else if (e.keyCode === key[2]) {
          player.rotate(-1);
        } else if (e.keyCode === key[3]) {
          player.rotate(1);
        }
      }

      // allows both drop keys to work when pressed simultaneously
      if (e.keyCode === key[4]) { // arrowDown
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
