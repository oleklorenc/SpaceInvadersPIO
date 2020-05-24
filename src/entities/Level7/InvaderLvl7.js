export default class Invader7 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "invader7"); //w tym konstruktorze dajemy nazwe do obrazka
      this.shootInterval = Phaser.Math.Between(200, 500);
      this.scene = scene;
      this.shootTime = Phaser.Math.Between(200, 500);
    }
  }
  