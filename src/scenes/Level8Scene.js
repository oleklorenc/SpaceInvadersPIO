import PlayerLaserGroup from "../entities/Level1/PlayerLaserGroup";
import InvaderLaserGroup from "../entities/Level1/InvaderLaserGroup";
import Bomb from "../entities/Level8/Bomb";
import Player from "../entities/Level8/Player";
import BossInvader from "../entities/Level8/BossInvader"
import PlayerLaser from "../entities/Level8/PlayerLaser";
import StartText from "../entities/StartText"

export default class Level1Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level8",
        physics: {
            arcade: {
                debug: false,
                gravity: { y: 200 }
            },
            matter: {
                debug: false,
                gravity: { y: 0 }
            }
        }
    });


    //Objects
    this.player;
    this.laserGroup;
    this.invaderLaserGroup;
    this.invadersGroup1;
    this.invadersGroup2;
    this.background;
    this.inputKeys;
    this.cursors;
    this.initialInvaders=16
    this.invadersLeft = this.initialInvaders;
    this.initialWaves=2
    this.actualWaves = this.initialWaves; // =n actual waves=n+1 zrobione: 1,2

    //Game Options
    this.movementSpeed;
    this.canInvaderShoot;
    this.colliderActive;
    this.canPlayerShoot=1
    this.isGameOver=false

    //Sounds
    this.invaderLaserSound;
    this.invaderDieSound;
    this.laserSound;
    this.gameOverSound
    this.nextStageSound
  }

  preload() {}

  create() {
    //Initialize input keys
    this.cursors = this.input.keyboard.createCursorKeys();
    //Set world bounds
    //ACTUALLY WORKS !
    //this.matter.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
    //this.matter.world.setBounds(0,0,window.innerWidth,window.innerHeight)

    //Scrolling Background
    this.background = this.add
      .tileSprite(
        0,
        0,
        window.innerWidth,
        window.innerHeight,
        "scrollBackground"
      )
      .setScale(2);
    
    this.startText=new StartText(this,-300,window.innerHeight/2,"Final Boss")

      
    this.bossInvader=new BossInvader(this, window.innerWidth/2,100, "bossInvader");
    
    this.healthBar = this.add.graphics();
    this.healthBar.fillStyle(0x00ccff, 0.8);
    this.healthBar.fillRect(100, 10, 100+this.bossInvader.lives*16, 14);

    this.playFirstTween()


    //Game Options
    this.movementSpeed = 10;
    this.canMove = 1;
    this.canInvaderShoot = 1;
    this.colliderActive = true;

    //Sounds
    this.laserSound = this.sound.add("laserSound");
    this.invaderDieSound = this.sound.add("invaderDieSound");
    this.gameOverSound = this.sound.add("gameOverSound");
    this.invaderLaserSound = this.sound.add("invaderLaserSound");
    this.nextStageSound=this.sound.add("nextStageSound")

    //Add player ship, input listeners, collide ship with world bounds
    this.player=new Player(this,this.cameras.main.width / 2,this.cameras.main.height-50, "ship")
    this.addEvents();


    //this.x=this.matter.add.image(500,500,"bossLaser").setScale(1,2)
    
    this.bossLaser=this.matter.add.sprite(-500,-500,"bossLaser").setScale(0.5,2).setOrigin(0.5).setSensor(true)
    this.bossLaser.setVisible(false)
    this.bossLaser.setRectangle(75,800)
    this.bossLaser.setName('bossLaser')

    
    this.anims.create({
      key: 'laserActive',
      frames: this.anims.generateFrameNumbers('bossLaser', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1
    });
    //this.x.play('left')//.setScaleX(0.5,2)*/
    //this.x.play('left', this.x)*/

    //this.bomb=new Bomb(this,500,500,"missileFly1");
    this.bombs=[new Bomb(this,-300,-300,"missileFly1"),new Bomb(this,-300,-300,"missileFly1"),new Bomb(this,-300,-300,"missileFly1")]
    

    var timer1 = this.time.addEvent({
      delay: 6000, // ms
      callback: () => {
        //var ile=Phaser.Math.Between(1,4);
        var x=this.bossInvader.x
        var y=this.bossInvader.y;
        var x1=window.innerWidth/3
        var x2=0
        for(let i=0;i<3;i++) {

          var xb=this.bossInvader.x;
          var yb=this.bossInvader.y+100;
          var xp=Phaser.Math.Between(x2,x1)
          var yp=this.player.y
          this.bombs[i].destroy();
          this.bombs[i]=new Bomb(this,x,y, "missileFly1").setScale(0.25);
          //this.matter.moveTo(this.bombs[i], xp, yp, 500)
          
          this.tweens.add({
            targets: this.bombs[i],
            x: xp,
            y: yp,
            duration: Phaser.Math.Between(1000,3000),
            onComplete: ()=>{
                this.bombs[i].anims.stop()
                this.bombs[i].play('explosion').setScale(0.25)
            },
            //completeDelay: 3000
          });
          this.bombs[i].setRotation(Math.PI + Math.atan((xb-xp)/(yp-yb)))
          x1+=window.innerWidth/3
          x2+=window.innerWidth/3
          console.log(x1)
        }
      },
      args: [this],
      loop: true,
    });

/*
    var timer2 = this.time.addEvent({
      delay: 3000, // ms
      callback: () => {
        if(!this.bossInvader.isShieldOn){

        }
      },
      args: [this],
      loop: true,
    });
*/



    /* WAZNE */
    this.cat2 = this.matter.world.nextCategory();
    this.bossInvader.setCollisionCategory(this.cat2)

    this.cat3 = this.matter.world.nextCategory();
    this.player.setCollisionCategory(this.cat3)
    
    this.matter.world.on('collisionstart', (event)=>{
      event.pairs.forEach(pair => {
        let { bodyA, bodyB } = pair;
    
        let gameObjectA = bodyA.gameObject;
        let gameObjectB = bodyB.gameObject;
    
        let aisBoss = gameObjectA instanceof BossInvader;
        let bisLaser = gameObjectB instanceof PlayerLaser;

        let playerBombCollision=(gameObjectA instanceof Player && gameObjectB instanceof Bomb) || (gameObjectA instanceof Bomb && gameObjectB instanceof Player)
        
        let playerLaserCollision=(gameObjectA instanceof Player && gameObjectB instanceof PlayerLaser) || (gameObjectA instanceof PlayerLaser && gameObjectB instanceof Player)

        let bossLaserPlayerCollision=(gameObjectA instanceof Player && gameObjectB.name=='bossLaser') || (gameObjectA.name=='bossLaser' && gameObjectB instanceof Player)

        if (aisBoss && bisLaser) {
          gameObjectA.lives--
          //console.log(this.bossInvader.lives)
          //gameObjectB.destroy()

          this.healthBar.clear()
          if(this.bossInvader.isShieldOn){
            this.healthBar.fillStyle(0x00ccff, 0.8);
            this.healthBar.fillRect(100, 10, 100+this.bossInvader.lives*16, 14);
            this.bossInvader.shield--
          }else{
            this.healthBar.fillStyle(0x8FEB21, 0.8);
            this.healthBar.fillRect(100, 10, 100+this.bossInvader.lives*16, 14);
            this.bossInvader.lives--
          }

          var xs=this.bossInvader.x
          var ys=this.bossInvader.y
          var xd=Phaser.Math.Between(0,window.innerWidth)
          var yd=window.innerHeight+50
          

          this.tweens.add({
            targets: gameObjectB,
            x: xd,
            y: yd,
            duration: 1000,
            onComplete: ()=>{
                gameObjectB.destroy()
            },
            //completeDelay: 3000
          });
          gameObjectB.setRotation(Math.PI + Math.atan((xs-xd)/(yd-ys)))
          gameObjectB.setTexture('invaderLaser')
        }

        if(playerBombCollision){
          if(!this.isGameOver)
          {
            this.gameOverSound.play()
            this.player.canMove=false
            this.player.setTint(0xff0000);
            this.isGameOver=true
            setTimeout(()=>{
              this.isGameOver=false
              this.scene.start('MainMenu')
            },3000)
          }
        }
        

        if(playerLaserCollision){
          if(!this.isGameOver){
            this.gameOverSound.play()
            this.player.setTint(0xff0000);
            this.player.canMove=false
            this.isGameOver=true
            if(gameObjectA instanceof PlayerLaser){
              gameObjectA.setVisible(false)
            }
            else{
              gameObjectB.setVisible(false)
            }
            setTimeout(()=>{
              this.isGameOver=false
              this.scene.start('MainMenu')
            },3000)
          }
        }

        if(bossLaserPlayerCollision){
          if(!this.isGameOver){
            this.gameOverSound.play()
            this.player.setTint(0xff0000);
            this.player.canMove=false
            this.isGameOver=true
            setTimeout(()=>{
              this.isGameOver=false
              this.scene.start('MainMenu')
            },3000)
          }
        }

      })
    })
    


  }

  playFirstTween(){
    this.tweens.add({
        targets: this.bossInvader,
        x: Phaser.Math.Between(0,window.innerWidth),
        y: 100,
        duration: 3000,
        ease: 'Power2',
        onComplete: ()=>{
            this.playSecondTween()
        },
        //completeDelay: 3000
    });
  }

  playSecondTween(){
    var xDirection=Phaser.Math.Between(0,window.innerWidth)
    this.tweens.add({
        targets: this.bossInvader,
        x: xDirection,
        y: 100,
        duration: 3000,
        ease: 'Power2',
        onStart: ()=>{

          this.tweens.add({
            targets: this.bossLaser,
            x: xDirection,
            //y: 100,
            duration: 3000,
            ease: 'Power2',
          })
          this.bossLaser.play('laserActive')
          this.bossLaser.x=this.bossInvader.x
          this.bossLaser.y=this.bossInvader.y+500
          this.bossLaser.setActive(true)
          this.bossLaser.setVisible(true)
        },
        onComplete: ()=>{
            this.bossLaser.setVisible(false)
            //this.bossLaser.setActive(false)
            this.bossLaser.setPosition(2000)
            this.playFirstTween()
        },
        //completeDelay: 3000
    });
  }

  
  addEvents() {
    // Fire Laser on Spacedown or Enterdown
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];
  }

  update(time, delta) {

    //Move start text
    this.startText.x+=10
    if(this.startText.x>window.innerWidth+500)
      this.startText.destroy()

    //Scroll Background
    this.background.tilePositionY -= 1.5;
    if(this.player.x<0) this.player.x=0
    if(this.player.x>window.innerWidth) this.player.x=window.innerWidth

    //Fire Laser
    this.inputKeys.forEach((key) => {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        if(this.canPlayerShoot){
          //this.laserGroup.fireBullet(this.player.x, this.player.y - 20);
          this.bullet=new PlayerLaser(this, this.player.x, this.player.y-50,"laser")
          this.bullet.setVelocityY(-20)
          this.laserSound.play();
        }
      }
    });

    //Move Player Ship
    if (this.player.canMove && this.cursors.left.isDown)
    this.player.setVelocityX(-this.movementSpeed);
    else if (this.player.canMove && this.cursors.right.isDown)
      this.player.setVelocityX(this.movementSpeed);
    else this.player.setVelocityX(0);

  }
}
