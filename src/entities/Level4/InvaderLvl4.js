export default class Invader4 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "invader4"); //w tym konstruktorze dajemy nazwe do obrazka
      this.shootInterval = Phaser.Math.Between(500, 1000);
      this.scene = scene;
      this.shootTime = Phaser.Math.Between(500, 1000);
    }
  }
  