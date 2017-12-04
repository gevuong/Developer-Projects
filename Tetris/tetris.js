// add event listener to wait for document to be loaded before looking for canvas element.
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("tetris");
  // set height and width attributes of canvasEl
  canvasEl.width = 240;
  canvasEl.height = 400;

  const ctx =  canvasEl.getContext('2d'); // set 2d rendering context for the drawing surface of <canvas< element.
  ctx.scale(20, 20);

  // CONSTANTS
  const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ];

  const player = {
    pos: {x: 5 , y: 0},
    matrix: matrix,
  };
  window.player = player; // test if piece moves by altering pos.x and pos.y

  const board = createMatrix(12, 20) // 12 units wide, 20 units high
  console.log(board); console.table(board);
  window.board = board;


  // draw T-shaped piece by filling in color for each element in matrix
  function drawMatrix(matrix, offset) { // offset used to move and redraw block
    matrix.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) { // draw red square of width 1, height 1
          ctx.fillStyle = 'red';
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


  function collide(board, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let row = 0; row < m.length; ++row) {
      for (let col = 0; col < m[row].length; ++col) {
        // console.log("row", row);
        // console.log("col", col);
        if (m[row][col] !== 0 &&
          (board[row + o.y] && board[row + o.y][col + o.x]) !== 0) {
            console.log("true");
          return true;
        }
      }
    }
    console.log("false");
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

  function playerDrop() {
    player.pos.y++;
    if (collide(board, player)) {
      player.pos.y--;
      merge(board, player);
      player.pos.y = 0; // when piece reaches bottom of board, piece starts from the top
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


  function playerRotate(dir) {
    rotate(player.matrix, dir);
  }

  // to rotate matrix, transpose matrix, and reverse each row
  function rotate(matrix, dir) {
    for (let row = 0; row < matrix.length; ++row) {
      for (let col = 0; col < row; ++col) { // NB: col < row, not matrix[row].length
        console.log("row", row);
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

  update();
})
