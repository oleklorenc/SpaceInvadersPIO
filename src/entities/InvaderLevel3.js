export default class InvaderLevel3 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "invaderLevel3"); //w tym konstruktorze dajemy nazwe do obrazka
      this.shootInterval = Phaser.Math.Between(4000, 8000); //4000 - 8000
      this.scene = scene;
      this.shootTime = Phaser.Math.Between(4000, 8000);
      this.invaderhealth = 1;
    }
  }