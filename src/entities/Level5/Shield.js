export default class Shield extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "shield"); //w tym konstruktorze dajemy nazwe do obrazka
      this.scene = scene;
    }
  }
  