// add event listener to wait for document to be loaded before loading canvas el.
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("tetris");


  // set height and width attributes of canvasEl
  canvasEl.width = 240;
  canvasEl.height = 400;

  const ctx =  canvasEl.getContext('2d'); // set 2d rendering context for the drawing surface of <canvas< element.
  ctx.scale(20, 20);

  // CONSTANTS
  const player = {
    pos: {x: 0 , y: 0},
    matrix: null,
    score: 0,
  };
  window.player = player; // test if piece moves by altering pos.x and pos.y

  const board = createMatrix(12, 20) // 12 units wide, 20 units high
  window.board = board;

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

  const COLORS = [
    null, 'red', 'blue', 'green', 'yellow', 'orange', 'purple', "violet"
  ]
  // draw T-shaped piece by filling in color for each element in matrix
  function drawMatrix(matrix, offset) { // offset used to move and redraw block
    matrix.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) { // draw red square of width 1, height 1
          // console.log(COLORS[val]);
          ctx.fillStyle = COLORS[val];
          ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }

  // used to create tetris board
  function createMatrix(width, height) {
    const matrix = [];
    while (height--) { // 0, -0, "", '', null, undefined, NaN, and false return falsey values in JS
      matrix.push(new Array(width).fill(0));
    }
    return matrix;
    // alternative:
    // matrix = new Array(height).fill(0).map(row => (new Array(width).fill(0)))
  }

  function removeLine() {
    let rowCount = 1;
    outer: for (let y = board.length - 1; y > 0; y--) {
      for (let col = 0; col < board[y].length; ++col) {
        if (board[y][col] === 0) {
          continue outer;
        }
      }
      const row = board.splice(y, 1)[0].fill(0); // removes and selects row and fills each element with 0.
      board.unshift(row); // add row of zeros to top of board
      ++y;

      player.score += rowCount * 10;
      rowCount *= 2;
    }
  }
  function collide(board, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let row = 0; row < m.length; ++row) {
      for (let col = 0; col < m[row].length; ++col) {
        // debugger
        // console.log("row", row);
        // console.log("col", col);
        if (m[row][col] !== 0 &&
          (board[row + o.y] && board[row + o.y][col + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  // function collide(board, player) {
  //   const [matrix, offset] = [player.matrix, player.pos];
  //   matrix.forEach((row, y) => { // for (y = 0, y < matrix.length)
  //     row.forEach((val, x) => {
  //       if (matrix[y][x] !== 0 && // if player.matrix element is a block AND...
  //         (board[y + offset.y] && board[y + offset.y][x + offset.x]) !== 0) { // if board has a row, y, AND...board has a col, x, and both are not 0, there is a collision. If row y alone, doesn't exist, it is also a collision because it's not equal to 0.
  //         console.log("true");
  //         return true;
  //       }
  //     });
  //   });
  //   console.log("false");
  //   return false;
  // }

  // copy values from currentPiece/player to board
  function merge(board, player) {
    player.matrix.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) {
          board[y + player.pos.y][x + player.pos.x] = val;
        }
      });
    });
  }
  window.merge = merge;

  function moveDirection(dir) {
    player.pos.x += dir;
    if (collide(board, player)) {
      player.pos.x -= dir;
    }
  }

  function resetPiece() {
    const pieces = "TSLIZJO";
    player.matrix = createPiece(pieces[Math.floor(pieces.length * Math.random())]);
    player.pos.y = 0; // when piece reaches bottom of board, piece starts from the top
    player.pos.x = Math.floor(board[0].length / 2) - Math.floor(player.matrix[0].length / 2);

    if (collide(board, player)) {
      board.forEach(row => row.fill(0)); // removes everything from board by replacing each row with zeros.
      // drawMatrix(board, {x: 0, y: 0});
      player.score = 0;
      updateScore();
    }
  }


  function playerDrop() {
    player.pos.y++;
    if (collide(board, player)) {
      player.pos.y--;
      merge(board, player);
      resetPiece();
      removeLine();
      updateScore();
    }
    dropCounter = 0; // don't want drop to happen immediately after arrowDown
  }


  document.addEventListener("keydown", function(e) {
    if (e.keyCode === 39) { // arrowRight
      moveDirection(1);
      console.log(player.pos.x);
    } else if (e.keyCode === 37) { // arrowLeft
      moveDirection(-1);
      console.log(player.pos.x);
    } else if (e.keyCode === 40) { // arrowDown
      playerDrop();
      console.log(player.pos.y);
    } else if (e.keyCode === 81) {
      playerRotate(-1);
    } else if (e.keyCode === 87) {
      playerRotate(1);
    }
  });

  // create logic to prevent rotation against left or right side of wall
  function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1; // initialize offset, to add to player.pos.x
    rotate(player.matrix, dir);
    // cannot only check collision once, need to continuously check
    while (collide(board, player)) {
      player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1: -1)) // algorithm to move piece however many spaces to left or right until there is no collision.
      if (offset > player.matrix[0].length) { // to exit loop in case offset is greater than lenght of current piece, Rotate back current piece in neg dir.
        rotate(player.matrix, -dir);
        player.pos.x = pos; // reset offset
        return
      }
    }
  }

  // to rotate matrix, transpose matrix, and reverse each row
  function rotate(matrix, dir) {
    for (let row = 0; row < matrix.length; ++row) {
      for (let col = 0; col < row; ++col) { // NB: col < row, not matrix[row].length
        [matrix[row][col], matrix[col][row]]
        =
        [matrix[col][row], matrix[row][col]];
      }
    }

    if (dir > 0) {
      matrix.forEach(row => row.reverse());
    } else {
      matrix.reverse();
    }
  }

  function draw() {
    // redraws ctx every time frame is updated to remove previously rendered piece
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    // fillRect(x, y, width, height), x: x-comp of coord for rectangle's starting point, y: y-comp of coord for rectangle's starting point
    drawMatrix(player.matrix, player.pos);
    drawMatrix(board, {x: 0, y: 0});
  }


  let dropCounter = 0;
  let dropInterval = 1000;
  let prevTime = 0;

  function update(time = 0) {
    dropCounter += time - prevTime;
    prevTime = time;

    if (dropCounter >= dropInterval) {
      playerDrop();
    }

    draw();
    requestAnimationFrame(update); // takes a callback as an arg to be invoked before repaint. callback itself calls requestAnimationFrame() to animate another frame before repaint. call method when ready to update animation onscreen
  }

  function updateScore() {
    document.getElementById("score").innerText = player.score;
  }

  resetPiece();
  updateScore();
  update();
})
