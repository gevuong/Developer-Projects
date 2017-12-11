class Tetris {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx =  canvas.getContext('2d'); // set 2d rendering context for the drawing surface of <canvas< element.
    this.ctx.scale(20, 20);

    this.colors = [
      null, 'red', 'blue', 'green', 'yellow', 'orange', 'purple', "violet"
    ];

    let prevTime = 0;
    const update = (time = 0) => {
      const deltaTime = time - prevTime;
      prevTime = time;
      player.update(deltaTime)

      this.draw();
      requestAnimationFrame(update); // takes a callback as an arg to be invoked before repaint. callback itself calls requestAnimationFrame() to animate another frame before repaint. call method when ready to update animation onscreen
    }

    update();
  }


  draw() {
    // redraws ctx every time frame is updated to remove previously rendered piece
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    // fillRect(x, y, width, height), x: x-comp of coord for rectangle's starting point, y: y-comp of coord for rectangle's starting point
    this.drawMatrix(player.matrix, player.pos);
    this.drawMatrix(board.matrix, {x: 0, y: 0});
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

}
