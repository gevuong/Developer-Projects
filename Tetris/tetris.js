// add event listener to wait for document to be loaded before looking for canvas element.
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("tetris");
  // set height and width attributes of canvasEl
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx =  canvasEl.getContext('2d'); // set 2d rendering context for the drawing surface of <canvas< element.
  ctx.scale(20, 20);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  // fillRect(x, y, width, height), x: x-comp of coord for rectangle's starting point, y: y-comp of coord for rectangle's starting point

  // T-shaped piece
  const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ]

  function draw() {
    drawMatrix(matrix, offset)
  }

  function drawMatrix(matrix, offset) { // offset used to move piece
    matrix.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val !== 0) { // draw red rectangle of width 1, height 1
          ctx.fillStyle = 'red';
          ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      })
    })
  }

  // drawMatrix(matrix, {x: 1, y: 1});
  function update()
  draw();
})
