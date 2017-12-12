class Tetris {
  constructor(element) {
    this.element = element;
    this.canvas = element.querySelector("canvas");
    this.ctx =  this.canvas.getContext('2d'); // set 2d rendering context for the drawing surface of <canvas< element.
    this.ctx.scale(20, 20);

    this.board = new Board(12, 20); // 12 units wide, 20 units high
    this.player = new Player(this); // to let Player class know player instance is created in Tetris class

    this.player.events.listen('score', score => {
      this.updateScore(score);
    });

    this.colors = [
      null, 'red', 'blue', 'green', 'yellow', 'orange', 'purple', "violet"
    ];

    let prevTime = 0;
    this._update = (time = 0) => {
      const deltaTime = time - prevTime;
      prevTime = time;
      this.player.update(deltaTime);

      this.draw();
      requestAnimationFrame(this._update); // takes a callback as an arg to be invoked before repaint. callback itself calls requestAnimationFrame() to animate another frame before repaint. call method when ready to update animation onscreen
    }
    this.updateScore(0); // initialize score counter
  }


  draw() {
    // redraws ctx every time frame is updated to remove previously rendered piece
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // fillRect(x, y, width, height), x: x-comp of coord for rectangle's starting point, y: y-comp of coord for rectangle's starting point
    this.drawMatrix(this.player.matrix, this.player.pos);
    this.drawMatrix(this.board.matrix, {x: 0, y: 0});
  }

  // draw T-shaped piece by filling in color for each element in matrix
  drawMatrix(matrix, offset) { // offset used to move and redraw block
    matrix.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) { // draw red square of width 1, height 1
          // console.log(COLORS[val]);
          this.ctx.fillStyle = this.colors[val];
          this.ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }

  run() {
    this._update();
  }

  // keep a record of the game state on the server that we send on broadcast. Call serialize() to return an object, a simple representation of the game
  serialize() {
    return {
      board: {
        matrix: this.board.matrix,
      },
      player: {
        matrix: this.player.matrix,
        pos: this.player.pos,
        score: this.player.score,
      },
    }
  }

  // use serialize and unserialize() in connectionManager
  unserialize(state) {
    this.board = Object.assign(state.board);
    this.player = Object.assign(state.player);
    this.updateScore(this.player.score);
    this.draw();
  }

  updateScore(score) {
    this.element.querySelector('.score').innerText = score;
  }
}
