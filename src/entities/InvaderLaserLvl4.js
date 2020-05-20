export default class InvaderLaser4 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "invaderLaser");
    this.setTintFill(0xb8ae00);
    
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.y > 1000) {
      this.setActive(false);
      this.setVisible(false);
      
    }
  }

  fireRight(x, y) {
    //this.setScale();
    this.setScale(1.5);
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityY(1000);

    setTimeout(()=> {
      let g = 400;
      this.setVelocityX(-g);
      this.setVelocityY(500);
      this.rotation = -50;
    }, 300);
  }

  fireLeft(x, y) {
    
    this.body.reset(x, y);
    this.setScale(1.5);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityY(1000);
    
    setTimeout(()=> {
      let g = -400;
      this.setVelocityY(500);
      this.setVelocityX(-g);
      this.rotation = 50;
    }, 300);

  }

}
