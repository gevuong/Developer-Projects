class Player {
  constructor(tetris) {
    this.DROP_SLOW = 700;
    this.DROP_FAST = 100;
    this.tetris = tetris;
    this.board = tetris.board;

    this.events = new Events;

    this.pos = {x: 0 , y: 0};
    this.matrix = null;
    this.score = 0;

    this.dropCounter = 0;
    this.dropInterval = this.DROP_SLOW;

    this.reset();
  }

  // create block types
  createPiece(type) {
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

  // player class method. "this" refers to player
  move(dir) {
    this.pos.x += dir;
    if (this.board.collide(this)) {
      this.pos.x -= dir;
      return;
    }
    this.events.emit('pos', this.pos);
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
        return;
      }
    }
    this.events.emit('matrix', this.matrix);
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
    this.dropCounter = 0; // don't want drop to happen immediately after arrowDown
    if (this.board.collide(this)) {
      // debugger
      this.pos.y--;
      this.board.merge(this);
      this.reset();
      this.score += this.board.removeLine();
      this.events.emit('score', this.score);
      return;
    }
    this.events.emit('pos', this.pos);
  }

  update(deltaTime) {
    this.dropCounter += deltaTime;
    if (this.dropCounter >= this.dropInterval) {
      this.drop();
    }
  }

  reset() {
    const pieces = "TSLIZJO";
    this.matrix = this.createPiece(pieces[Math.floor(pieces.length * Math.random())]);
    this.pos.y = 0; // when piece reaches bottom of board, piece starts from the top
    this.pos.x = Math.floor(this.board.matrix[0].length / 2) - Math.floor(this.matrix[0].length / 2);

    if (this.board.collide(this)) {
      this.board.clear();
      this.score = 0;
      this.events.emit('score', this.score);
    }

    this.events.emit('pos', this.pos);
    this.events.emit('matrix', this.matrix);
  }
}
