export default class InvaderLaser7 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "invaderLaser");
      this.setTintFill(0xfcca03);
    }
  
    preUpdate(time, delta) {
      super.preUpdate(time, delta);
  
      if (this.y > 1000) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  
    fire(x, y) {
      this.body.reset(x, y);
      this.setActive(true);
      this.setVisible(true);
      this.setVelocityY(700);
      //this.setAngularVelocity(111);
      let i = 200;

      let inter = setInterval(() => {
        let x = 2 + Math.floor((11-2) * Math.random());
        if(x%2 == 0){
          this.setVelocityX(-i);
          this.setRotation(0.5);
        } else {
          this.setVelocityX(i);
          this.setRotation(-0.5);
        }
        x = 0;
      },150)
    //console.log(this.anims);

    }

    fireFalse(x,y)
    {
      this.setScale(0.6);
      this.body.reset(x, y);
      this.setActive(true);
      this.setVisible(true);
      this.setVelocityY(1000);
      let t = 500
      let why = setInterval(() => 
      {
        this.setVelocityY(t)
        t -= 20;
      }, 20)

      setTimeout(() => 
      {
        clearInterval(why);
        this.setVelocityY(1000);
      },650)

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
  