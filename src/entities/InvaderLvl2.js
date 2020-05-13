export default class Invader extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "invader2"); //w tym konstruktorze dajemy nazwe do obrazka
    this.shootInterval = Phaser.Math.Between(5000, 8000);
    this.scene = scene;
    this.shootTime = Phaser.Math.Between(4000, 8000);
  }
}
