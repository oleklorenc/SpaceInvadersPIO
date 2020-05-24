export default class BossInvader extends Phaser.Physics.Matter.Sprite {
	constructor(scene,x,y,texture) {
		super(scene.matter.world,x,y,texture);
    this.setScale(0.045)
    //this.setImmovable(true)
    this.scene = scene;
    this.lives=100;
    this.shield=100
    this.isShieldOn=true
    this.setSensor(true)

		scene.add.existing(this)
  }
  

  fireLaser(){
    
  }

}