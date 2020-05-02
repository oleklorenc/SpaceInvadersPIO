export default class InvaderTest extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "invaderTest"); //w tym konstruktorze dajemy nazwe do obrazka
      this.shootInterval = Phaser.Math.Between(4000, 8000); //4000 - 8000
      this.scene = scene;
      this.shootTime = Phaser.Math.Between(4000, 8000);
      this.invaderhealth = 2;
    }
  }