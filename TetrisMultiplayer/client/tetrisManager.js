class TetrisManager {
  constructor(document) {
    this.document = document;
    this.template = document.getElementById("player-template");
    this.instances = new Set;
  }

  createPlayer() {
    const element = this.document
      .importNode(this.template.content, true) // deep import
      .children[0];

    const tetris = new Tetris(element);
    this.instances.add(tetris); // to access instances of Set object on window: [...tetrisManager.instances][0]

    this.document.body.appendChild(tetris.element);

    return tetris;
  }

  removePlayer(tetris) {
    this.instances.delete(tetris);
    this.document.body.removeChild(tetris.element);
  }

  sortPlayers(tetri) {
    tetri.forEach(tetris => {
      this.document.body.appendChild(tetris.element); // appendChild never creates copies of nodes. So if we put every tetris last in order, it will be sorted
    });
  }
}
