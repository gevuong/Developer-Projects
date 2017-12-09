// add event listener to wait for document to be loaded before loading canvas el.
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("game-screen");

  canvasEl.width = 650;
  canvasEl.height = 650;

  const ctx = canvasEl.getContext("2d");
  ctx.fillRect(0, 0, 50, 50);

})
