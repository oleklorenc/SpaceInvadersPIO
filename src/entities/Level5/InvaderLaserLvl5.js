export default class InvaderLaser5 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "invaderLaser");
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y > 1000) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  fireNormal(x, y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);
    this.setVelocityY(700);
  }

  fireFast(x, y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);
    this.setVelocityY(1000);
  }
}
