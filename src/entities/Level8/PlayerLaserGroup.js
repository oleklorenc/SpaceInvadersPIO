import PlayerLaser from "./PlayerLaser"

// SET XY OF THIS GROUP SO THAT IT DOES NOT COLLIDE WITH MOVING OBJECTS


export default class PlayerLaserGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene, startX, startY) {
      super(scene.matter.world, scene, { runChildUpdate: true });
  
      this.createMultiple({
        frameQuantity: 10,
        key: "laser",
        active: false,
        visible: false,
        classType: PlayerLaser,
        setXY: {x: startX, y: startY}
      });
    }
  
    fireBullet(x, y) {
      const laser = this.getFirstDead(false);
  
      if (laser) {
        laser.fire(x, y);
      }
    }
}