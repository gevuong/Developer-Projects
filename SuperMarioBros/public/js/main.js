// add event listener to wait for document to be loaded before loading canvas el.
document.addEventListener("DOMContentLoaded", function() {

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

  // a sprite sheet contains multiple frames in one image
  class SpriteSheet {
    constructor(image, width, height) {
      this.image = image;
      this.width = width;
      this.height = height;
      this.tiles = new Map(); // save buffer in Map instance
    }

    define(name, x, y) {
      // buffer is used to save subset of image (which in this case is a tile), so we don't have to draw from large image file every time
      const buffer = document.createElement("canvas"); // create <canvas> element programmatically using JS
      buffer.width = this.width;
      buffer.height = this.height;
      // draw subset (i.e. tile) of image in this buffer
      buffer.getContext("2d")
        .drawImage(this.image,
          x * this.width, y * this.height, this.width, this.height, // size of subset (i.e. tile) image
          0, 0, this.width, this.height // draw full buffer of subset
        );
      this.tiles.set(name, buffer); // Map.prototype.set(key, value) method adds or updates key and value of element to Map object. For more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
    }

    // we want to draw buffer to context
    draw(name, context, x, y) {
      const buffer = this.tiles.get(name); // Map.prototype.get(key) returns key of specified element from Map object. We want to retrieve buffer from tiles.set() in Map object.
      ctx.drawImage(buffer, x, y); // draw buffer at x- and y-coord.
    }

  }

  // Step 1:
  const canvasEl = document.getElementById("game-screen");
  canvasEl.width = 640;
  canvasEl.height = 640;

  const ctx = canvasEl.getContext("2d"); // context (or ctx) contains the API that we draw with
  ctx.fillRect(0, 0, 50, 50); // draw black rectangle for testing

  loadImage('../public/img/tiles.png').then(image => { // load tiles.png, chain a .then() to create a spritsheet with image and tile size: 16, 16.
    const sprite = new SpriteSheet(image, 16, 16); // tile size is (16, 16)
    sprite.define("ground", 0, 0); // define sprite with a name and coord. Want ground to be at (0, 0)

    sprite.draw("ground", ctx, 55, 62); // draw ground on ctx (45, 62)

    // drawImage() method is polymorphic, meaning behavior changes depending on number of args and type of args.
    ctx.drawImage(image,
      0, 0, 16, 16, // clip tiles.png and...
      0, 0, 16, 16) // position clipped img on canvas. For more info: https://www.w3schools.com/tags/canvas_drawimage.asp
  });
})
