export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map(); // save tile buffer to Map instance
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
    context.drawImage(buffer, x, y); // drawImage() method is polymorphic, meaning behavior changes depending on number of args and type of args. In this case, (buffer, x, y) draws buffer img onto canvas. For more info: https://www.w3schools.com/tags/canvas_drawimage.asp
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
