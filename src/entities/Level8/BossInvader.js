export default class BossInvader extends Phaser.Physics.Matter.Sprite {
	constructor(scene,x,y,texture) {
		super(scene.matter.world,x,y,texture);
    this.setScale(0.25)
    //this.setImmovable(true)
    this.scene = scene;
    this.lives=100
    this.shield=100
    this.isShieldOn=true
    this.setSensor(true)

    scene.add.existing(this)
    
/*
    this.anim=this.scene.anims.create({
      key: 'bossExplosion',
      frames: this.scene.anims.generateFrameNames('bossExplosion', {start: 2, end:10}),
      frameRate: 10,
      repeat: 3,
    })*/
    //this.play('bossExplosion').setScale(3)
  }
  

  fireLaser(){
    
  }

}