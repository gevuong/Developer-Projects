
class Player {
  constructor(tetris) {
    this.tetris = tetris;
    this.board = tetris.board;

    this.pos = {x: 0 , y: 0};
    this.matrix = null;
    this.score = 0;

    this.dropCounter = 0;
    this.dropInterval = 800;

    this.reset();
  }

  // player class method. "this" refers to player
  move(dir) {
    this.pos.x += dir;
    if (this.board.collide(this)) {
      this.pos.x -= dir;
    }
  }

  // create logic to prevent rotation against left or right side of wall
  rotate(dir) {
    const pos = this.pos.x;
    let offset = 1; // initialize offset, to add to player.pos.x
    this._rotateMatrix(this.matrix, dir);
    // cannot only check collision once, need to continuously check
    while (this.board.collide(this)) {
      this.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1: -1)) // algorithm to move piece however many spaces to left or right until there is no collision.
      if (offset > this.matrix[0].length) { // to exit loop in case offset is greater than lenght of current piece, Rotate back current piece in neg dir.
        this._rotateMatrix(this.matrix, -dir);
        this.pos.x = pos; // reset offset
        return
      }
    }
  }

  // to rotate matrix, transpose matrix, and reverse each row
  _rotateMatrix(matrix, dir) {
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

  drop() {
    this.pos.y++;
    if (this.board.collide(this)) {
      this.pos.y--;
      this.board.merge(this);
      this.reset();
      this.board.removeLine();
      // updateScore();
    }
    this.dropCounter = 0; // don't want drop to happen immediately after arrowDown
  }

  update(deltaTime) {
    this.dropCounter += deltaTime;
    if (this.dropCounter >= this.dropInterval) {
      this.drop();
    }
  }

  reset() {
    const pieces = "TSLIZJO";
    this.matrix = createPiece(pieces[Math.floor(pieces.length * Math.random())]);
    this.pos.y = 0; // when piece reaches bottom of board, piece starts from the top
    this.pos.x = Math.floor(this.board.matrix[0].length / 2) - Math.floor(this.matrix[0].length / 2);

    if (this.board.collide(this)) {
      this.board.clear();
      // drawMatrix(board, {x: 0, y: 0});
      this.score = 0;
      // updateScore();
    }
  }
}
