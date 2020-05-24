import InvaderLvl6 from "./InvaderLvl6"

// SET XY OF THIS GROUP SO THAT IT DOES NOT COLLIDE WITH MOVING OBJECTS

export default class InvaderGroupLvl6 extends Phaser.Physics.Arcade.Group {
    constructor(scene, offsetX, offsetY, startX, startY) {
      super(scene.physics.world, scene);
  
      this.createMultiple({
        frameQuantity: 8,
        key: "invader",
        active: false,
        visible: false,
        classType: InvaderLvl6,
        setXY: {x: startX, y: startY}
      });
      this.scene=scene
      this.offsetX=offsetX
      this.offsetY=offsetY
    }
  
    setInvaders() {
      for (let i = 0; i < 8; i++) {
        let invader = this.getFirstDead(false);
        invader.setActive(true)
        invader.setVisible(true)
        invader.setScale(0.2)
        invader.setImmovable(true)

        this.scene.tweens.add({
          targets: invader,
          x: this.offsetX+200+200*i,
          y: 100+this.offsetY,
          duration: 3000,
          ease: 'Power2',
          onComplete: ()=>{this.scene.canPlayerShoot=true},
        });
      }
    }
  
    fireInvaderLaser(){
      var maxShooter=Phaser.Math.Between(0,15)
      for(let i=0;i<maxShooter;i++){
        var index=Phaser.Math.Between(0,this.getChildren().length-1)
        if(this.getChildren()[index].active){
          this.scene.invaderLaserGroup2.fireBullet(this.getChildren()[index].x,this.getChildren()[index].y+15)
          this.scene.invaderLaserSound.play()
          console.log(this.getChildren()[index].y)
        }
      }
    }
  }