
class Board {
  constructor(width, height) {
    const matrix = [];
    while (height--) { // 0, -0, "", '', null, undefined, NaN, and false return falsey values in JS
      matrix.push(new Array(width).fill(0));
    } // alternative:
      // matrix = new Array(height).fill(0).map(row => (new Array(width).fill(0)))
    this.matrix = matrix;
  }

  clear() {
    this.matrix.forEach(row => row.fill(0)); // removes everything from board by replacing each row with zeros.
  }

  collide(player) {
    const [matrix, offset] = [player.matrix, player.pos];
    for (let row = 0; row < matrix.length; ++row) {
      for (let col = 0; col < matrix[row].length; ++col) {
        // debugger
        if (matrix[row][col] !== 0 &&
          (this.matrix[row + offset.y] && this.matrix[row + offset.y][col + offset.x]) !== 0) {
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
  merge(player) {
    player.matrix.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) {
          this.matrix[y + player.pos.y][x + player.pos.x] = val;
        }
      });
    });
  }

  removeLine() {
    let rowCount = 1;
    outer: for (let y = this.matrix.length - 1; y > 0; y--) {
      for (let col = 0; col < this.matrix[y].length; ++col) {
        if (this.matrix[y][col] === 0) {
          continue outer;
        }
      }
      const row = this.matrix.splice(y, 1)[0].fill(0); // removes and selects row and fills each element with 0.
      this.matrix.unshift(row); // add row of zeros to top of board
      ++y;

      player.score += rowCount * 10;
      rowCount *= 2;
    }
  }
}
