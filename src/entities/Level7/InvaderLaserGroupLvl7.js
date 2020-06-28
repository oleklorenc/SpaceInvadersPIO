import InvaderLaser7 from "./InvaderLaserLvl7";

// SET XY OF THIS GROUP SO THAT IT DOES NOT COLLIDE WITH MOVING OBJECTS

export default class InvaderLaserGroup7 extends Phaser.Physics.Arcade.Group {
  constructor(scene, startX, startY) {
    super(scene.physics.world, scene, { runChildUpdate: true });

    this.createMultiple({
      frameQuantity: 15,
      key: "laser",
      active: false,
      visible: false,
      classType: InvaderLaser7,
      setXY: {x: startX, y: startY}
    });
  }

  fireBullet(x, y) {
    let laser = this.getFirstDead(false);
    if (laser) {
      laser.fire(x, y);
    }
    laser = this.getFirstDead(false);

    if (laser) {
      
      laser.fireFalse(x, y);
    }
    
  }
}
