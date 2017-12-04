// add event listener to wait for document to be loaded before looking for canvas element.
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("tetris");
  // set height and width attributes of canvasEl
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx =  canvasEl.getContext('2d'); // set 2d rendering context for the drawing surface of <canvas< element.
  ctx.scale(20, 20);

  // T-shaped piece
  const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ];

  // draws T-shaped piece by filling in color for each element in matrix
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

  const player = {
    pos: {x: 2, y: 2},
    matrix: matrix,
  }

  window.player = player; // test if piece moves by altering pos.x and pos.y

  function draw() {
    // redraws ctx every time frame is updated to remove previously rendered piece
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    // fillRect(x, y, width, height), x: x-comp of coord for rectangle's starting point, y: y-comp of coord for rectangle's starting point
    drawMatrix(player.matrix, player.pos);
  }

  let dropCounter = 0;
  let dropInterval = 1000;
  let prevTime = 0;
  function update(time = 0) {
    dropCounter += time - prevTime;
    prevTime = time;
    console.log(dropCounter);

    if (dropCounter >= dropInterval) {
      player.pos.y += 1;
      dropCounter = 0;
    }
    draw();
    requestAnimationFrame(update); // takes a callback as an arg to be invoked before repaint. callback itself calls requestAnimationFrame() to animate another frame before repaint. call method when ready to update animation onscreen
  }

  update();
})
