var board = [
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 0, 0, 0],
  [0, 0, 0, 2, 2, 0, 0, 0]
]


function drawBoard() {
  document.getElementById("board").innerHTML = "";
  for (let row = 0; row < board.length; row++) {
    // console.log(board[row]);
    for (let col = 0; col < board[row].length; col++) {
      // console.log(board[row][col]);
      if (board[row][col] === 0) {
        document.getElementById("board").innerHTML += "<div class='empty'></div>"
      } else if (board[row][col] === 1 || board[row][col] === 2) {
        document.getElementById("board").innerHTML += "<div class='block'></div>";
      }
    }
    document.getElementById("board").innerHTML += "<br />";
  }
}


function movePiece() {

}



// movePiece down. If any elements range (0..9), move piece down
function movePieceDown() {
  var canMove = true;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      // we are looking at a moving piece
      if (board[row][col] === 1) {
        // if piece reaches bottom of board, or row below element equals 2, piece cannot move further down
        if (row === board.length - 1 || board[row + 1][col] === 2) {
          canMove = false;
          freeze();
        }
      }
    }
  }

  // after checking entire board, and canMove remains true, want to check from the bottom up of board because we want to shift element down by one row. If we start from top, then the first row of box element will overwrite its second row of box element.
  if (canMove) {
    for (let row = board.length - 1; row >= 0; row--) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 1) { // element exists
          board[row + 1][col] = board[row][col]; // set bottom element to equal previous element
          board[row][col] = 0;
        }
      }
    }
  }
}


// movePiece down. If any elements range (0..9), move piece down
function movePieceLeft() {
  var canMove = true;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      // we are looking at a moving piece
      if (board[row][col] === 1) {
        // if piece reaches bottom of board, or row below element equals 2, piece cannot move further down
        if (col === 0 || board[row][col - 1] === 2) {
          canMove = false;

        }
      }
    }
  }

  // after checking entire board, and canMove remains true, want to check from the bottom up of board because we want to shift element down by one row. If we start from top, then the first row of box element will overwrite its second row of box element.
  if (canMove) {
    for (let row = board.length - 1; row >= 0; row--) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 1) { // if element exists
          board[row][col - 1] = board[row][col]; // set bottom element to equal previous element
          board[row][col] = 0;
        }
      }
    }
  }
}


// before code is executed, JS pulls all the fcns to top of code before running the code, which is why we can define functions at bottom
function freeze() {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] == 1) {
        board[row][col] = 2;
      }
    }
  }
  board[0] = [0, 0, 0, 1, 1, 0, 0, 0];
  board[1] = [0, 0, 0, 1, 1, 0, 0, 0];
}


document.onkeydown = function(e) {
  console.log(e.keyCode);
  if (e.keyCode === 37) {
    movePieceLeft();
  } else if (e.keyCode === 39) {

  }
  drawBoard();
}


function gameLoop() {
  drawBoard();
  movePieceDown();
  setTimeout(gameLoop, 1000);
}

drawBoard();
gameLoop();
