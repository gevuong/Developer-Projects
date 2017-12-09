// add event listener to wait for document to be loaded before loading canvas el.
document.addEventListener("DOMContentLoaded", function() {

  function loadImage(url) { // takes a url and returns a promise
    return new Promise(resolve => {
      const image = new Image(); // create image instance and attach a "load" event listener.
      image.addEventListener('load', () => {
        resolve(image); // resolve promise with the image itself
      });
      image.src = url; // in order to activate image downloading
    })
  }

  class SpriteSheet {
    constructor(image, width, height) {
      this.image = image;
      this.width = width;
      this.height = height;
    }
  }

  const canvasEl = document.getElementById("game-screen");
  canvasEl.width = 650;
  canvasEl.height = 650;

  const ctx = canvasEl.getContext("2d"); // context (or ctx) contains the API that we draw with
  ctx.fillRect(0, 0, 50, 50);

  loadImage('../public/img/tiles.png').then(image => { // load tiles.png, chain a "then" to create a spritsheet with image and tile size: 16, 16.
    const sprite = new SpriteSheet(image, 16, 16);
    sprite.define("ground", 0, 0); // define sprite with a name and coord.
  // drawImage() method is polymorphic, meaning behavior changes depending on number of args and type of args.

  sprite.draw("ground", ctx, 45, 62); // draw sprite on ctx
    ctx.drawImage(image,
      0, 0, 16, 16, // defines what we want to draw from tiles.png
      0, 0, 16, 16) // (0, 0) is where we want to draw images in canvas, and size of image (in this case, 16, 16)
  });
})
