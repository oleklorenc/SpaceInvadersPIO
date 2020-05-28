export default class Bomb extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture) {
      super(scene.matter.world, x, y, texture); //w tym konstruktorze dajemy nazwe do obrazka
      this.scene = scene;
      scene.add.existing(this)
      this.setOrigin(0.5,0.5)
      this.setSensor(true)
      this.setCollisionCategory(this.scene.cat3)
      //this.setCircle(100)
      this.flaga=true
      //this.body.setAngle(90)
      //this.setAngle(180)
      //this.setCollideWorldBounds(true);
      this.explosionSound = this.scene.sound.add("rocketExplosion");


      this.anim1=this.scene.anims.create({
        key: 'fly',
        frames: [
            { key: 'missileFly1' },
            { key: 'missileFly2' },
            { key: 'missileFly3' },
            { key: 'missileFly4' },
            { key: 'missileFly5' },
            { key: 'missileFly6' },
            { key: 'missileFly7' },
            { key: 'missileFly8' },
            { key: 'missileFly9' },
        ],
        frameRate: 20,
        repeat: -1
      });
      
      this.play('fly').setScale(0.25);

      this.anim2=this.scene.anims.create({
        key: 'explosion',
        frames: [
            { key: 'missileBoom1' },
            { key: 'missileBoom2' },
            { key: 'missileBoom3' },
            { key: 'missileBoom4' },
            { key: 'missileBoom5' },
            { key: 'missileBoom6' },
            { key: 'missileBoom7' },
            { key: 'missileBoom8' },
            { key: 'missileBoom9' },
        ],
        frameRate: 10,
        repeat: 0,
        killOnComplete: true
      })

      this.on('animationcomplete', function (anim, frame) {
        if(anim.key=='fly'){
          this.explosionSound.play({
            volume: this.scene.sys.game.globals.model.sound,
          })
          this.setCircle(100)
          this.setSensor(true)
        }else if(anim.key=='explosion'){
          this.x=-400
        }
      }, this);
      
    }


    preUpdate(time, delta) {
        
      super.preUpdate(time, delta);
  
      if (this.y > this.scene.player.y) {
        if(this.flaga){
          /*this.anims.stop()
          this.play('explosion').setScale(0.25).on('animationcomplete', ()=>{
            //this.setActive(false)
            //this.setVisible(false)
            //this.scene.physics.world.removeCollider(this);
            //console.log(this.scene.physics.overlapCirc(this.x, this.y, 100, true, true) )
            //this.disableBody(true,true)
          })
          this.flaga=false
          //this.setVelocity(0)
          */
        }
      }
    }
}