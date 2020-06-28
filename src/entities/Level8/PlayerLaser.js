/*
export default class PlayerLaser extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
      super(scene.matter.world, x, y, "laser");
      scene.add.existing(this)
    }
  
    preUpdate(time, delta) {
      super.preUpdate(time, delta);
  
      if (this.y <= 0) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  
    fire(x, y) {
      this.body.reset(x, y);
  
      this.setActive(true);
      this.setVisible(true);
  
      this.setVelocityY(-900);
    }
  }
  */
  export default class PlayerLaser extends Phaser.Physics.Matter.Sprite {
    constructor(scene,x,y,texture) {
      super(scene.matter.world,x,y,texture);
      //this.setScale(0.045)
      //this.setImmovable(true)
      this.scene = scene;
      this.setCollisionCategory(this.scene.cat2)
      this.setSensor(true)
      //this.lives=100;
      //this.shield=100
      scene.add.existing(this)
    }


    preUpdate(time, delta) {
      super.preUpdate(time, delta);
  
      if (this.y >= window.innerHeight+200 || this.y<=-200) {
        console.log("Zniszczono"+this)
        this.destroy()
      }
    }
  
  }
