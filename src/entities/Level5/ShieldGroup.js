import Shield from "./Shield"


// SET XY OF THIS GROUP SO THAT IT DOES NOT COLLIDE WITH MOVING OBJECTS


export default class ShieldGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene, offsetX, offsetY, startX, startY) {
      super(scene.physics.world, scene);
  
      this.createMultiple({
        frameQuantity: 8,
        key: "shield",
        active: false,
        visible: false,
        classType: Shield,
        setXY: {x: startX, y: startY}
      });
      this.scene=scene
      this.offsetX=offsetX
      this.offsetY=offsetY + 40
    }
  
    setShields() {
      for (let i = 0; i < 8; i++) {
        let shield = this.getFirstDead(false);
        shield.setActive(true)
        shield.setVisible(true)
        shield.setScale(0.2)

        this.scene.tweens.add({
          targets: shield,
          x: this.offsetX+200+200*i,
          y: 100+this.offsetY,
          duration: 3000,
          ease: 'Power2'
          //completeDelay: 3000
      });

        /*
        invader.x=this.offsetX+200+200*i
        invader.y=100+this.offsetY
        invader.setActive(true)
        invader.setVisible(true)
        invader.setScale(0.2)
        */
      }
    }
  }