// modules
import { loadImage, loadLevel } from './loaders.js';
import SpriteSheet from './spriteSheet.js';

// add eventListener to wait for document to be loaded before loading <canvas>.
// document.addEventListener("DOMContentLoaded", function() {
  function drawBackground(background, context, sprite) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      // Info on performance when using i++ vs ++i https://stackoverflow.com/questions/29885719/i-vs-i-in-a-javascript-for-loop
      for (let x = x1; x < x2; x++) {
        for (let y = y1; y < y2; y++) {
          sprite.drawTile(background.tile, context, x, y);
        }
      }
    });
  }

  // Step 1:
  const canvasEl = document.getElementById("game-screen");
  canvasEl.width = 640;
  canvasEl.height = 640;

  const ctx = canvasEl.getContext("2d"); // context (or ctx) contains the API that we draw with
  // ctx.fillRect(0, 0, 50, 50); // draw black rectangle to test ctx

  loadImage('/img/spriteSheet.png').then(image => { // load tiles.png, chain a .then() to create spriteSheet with image and tile size.
    const sprite = new SpriteSheet(image, 16, 16); // specify tile size
    sprite.define("ground", 0, 0); // define sprite with a name and coord of where the tile is located in spriteSheet.png.
    sprite.define("sky", 3, 23);

    loadLevel('1-1').then(level => {
      level.backgrounds.forEach(background => (
        drawBackground(background, ctx, sprite)
      ))
    })


    // for (let x = 0; x < 35; x++) {
    //   for (let y = 15; y < 17; y++) {
    //     sprite.drawTile("ground", ctx, x, y); // draw "ground" on ctx with coord to position "ground" in canvas
    //   }
    // }
  });
// })
