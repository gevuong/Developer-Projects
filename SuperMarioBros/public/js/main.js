// add eventListener to wait for document to be loaded before loading <canvas>.
// document.addEventListener("DOMContentLoaded", function() {

  // function takes a url and returns a promise
  function loadImage(url) {
    return new Promise(resolve => {
      const image = new Image(); // create image instance and attach a "load" type event listener. Load event fires when image is downloaded and ready to display
      image.addEventListener('load', () => {
        resolve(image); // resolve promise with the image itself, meaning promise is fulfilled
      });
      image.src = url; // in order to initiate image downloading
    })
  }

  // Step 1:
  const canvasEl = document.getElementById("game-screen");
  canvasEl.width = 640;
  canvasEl.height = 640;

  const ctx = canvasEl.getContext("2d"); // context (or ctx) contains the API that we draw with
  ctx.fillRect(0, 0, 50, 50); // draw black rectangle for testing

  loadImage('../public/img/tiles.png').then(image => { // load tiles.png, chain a .then() to create spriteSheet with image and tile size.
    const sprite = new SpriteSheet(image, 16, 16); // specify tile size
    sprite.define("ground", 0, 0); // define sprite with a name and coord. Want ground to be at (0, 0)

    sprite.draw("ground", ctx, 55, 62); // draw ground on ctx with coord
  });
// })
