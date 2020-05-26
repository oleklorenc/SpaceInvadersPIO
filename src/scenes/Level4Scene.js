import PlayerLaserGroup from "../entities/Level1/PlayerLaserGroup";
import InvaderLaserGroup4 from "../entities/Level4/InvaderLaserGroupLvl4";
import InvaderGroup4 from "../entities/Level4/InvaderGroupLvl4";
import InvaderLaserGroup from "../entities/Level1/InvaderLaserGroup";
import InvaderGroup from "../entities/Level1/InvaderGroup";
import Player from "../entities/Level4/Player"
import StartText from "../entities/StartText"

export default class Level4Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level4" });

    //Objects
    this.player;
    this.laserGroup;
    this.invaderLaserGroup4;  //level 4 LaserGroup
    this.invaderLaserGroup; //basic LaserGropu
    this.invadersGroup4;  //level 4 InvaderGroup
    this.invadersGroup; //basic InvaderGroup
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
    this.canPlayerShoot=0

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
    this.physics.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
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
    
    this.startText=new StartText(this,-300,window.innerHeight/2,"Level 4")

    //Objects
    this.laserGroup = new PlayerLaserGroup(this, -300, -300);
    this.createNewWave();
    this.invaderLaserGroup4 = new InvaderLaserGroup4(this,-800,800); //elvis
    this.invaderLaserGroup = new InvaderLaserGroup(this,-500,500);

    //Game Options
    this.movementSpeed = 400;
    this.canInvaderShoot = 1;
    this.colliderActive = true;

    //Sounds
    this.laserSound = this.sound.add("laserSound");
    this.invaderDieSound = this.sound.add("invaderDieSound");
    this.invaderLaserSound = this.sound.add("invaderLaserSound");
    this.gameOverSound = this.sound.add("gameOverSound");
    this.nextStageSound=this.sound.add("nextStageSound")


    //Add player ship, input listeners, collide ship with world bounds
    this.player=new Player(this,this.cameras.main.width / 2,this.cameras.main.height-50)
    this.player.addCollider()
    this.addEvents();

    //Invader shoot events
    var timer1 = this.time.addEvent({
      delay: 1500, // ms
      callback: () => {
        this.invadersGroup4.fireInvaderLaser();
      },
      args: [this],
      loop: true,
    });

    var timer2 = this.time.addEvent({
      delay: 1500, // ms
      callback: () => {
        this.invadersGroup.fireInvaderLaser();
      },
      args: [this],
      loop: true,
    });

    //InvadersGroup-PlayerLaser colliders
    this.addColliders();
  }

  addEvents() {

    // Fire Laser on Spacedown or Enterdown
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];
  }

  createNewWave() {
    this.invadersGroup4 = new InvaderGroup4(this, 0, 0, -200, -200);
    this.invadersGroup = new InvaderGroup(this, 120, 100, window.innerWidth+200, -200);

    this.invadersGroup4.setInvaders();
    this.invadersGroup4.setVelocityX(-500);

    this.invadersGroup.setInvaders();
    this.invadersGroup.setVelocityX(200);
  }

  addColliders() {
    //PlayerLasers-Invaders Collider
    this.physics.add.collider(
      this.invadersGroup4,
      this.laserGroup,
      (invader, laser) => {
        this.invaderDieSound.play();
        invader.setActive(false)
        invader.disableBody(true,true)
        laser.setX(-100) //SET LASERS X AFTER COLLISION- AVOID DOUBLE HIT
          this.invadersLeft--;
      }
    );    
    
    this.physics.add.collider(
      this.invadersGroup,
      this.laserGroup,
      (invader, laser) => {
        this.invaderDieSound.play();
        invader.setActive(false)
        invader.disableBody(true,true)
        laser.setX(-100) //SET LASERS X AFTER COLLISION- AVOID DOUBLE HIT
        this.invadersLeft--;
      }
    );
  }

  update(time, delta) {

    //Move start text
    this.startText.x+=10
    if(this.startText.x>window.innerWidth+500)
      this.startText.destroy()
      
    //Scroll Background
    this.background.tilePositionY -= 1.5;

    //Fire Laser
    this.inputKeys.forEach((key) => {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        if(this.canPlayerShoot){
          this.laserGroup.fireBullet(this.player.x, this.player.y - 20);
          this.laserSound.play();
        }
      }
    });

    //Move Player Ship
    if (this.player.canMove && this.cursors.left.isDown)
      this.player.setVelocityX(-this.movementSpeed);
    else if (this.player.canMove && this.cursors.right.isDown)
      this.player.setVelocityX(this.movementSpeed);
    else 
      this.player.setVelocityX(0);
    
    //Move InvadersGroup2
    if (
      this.invadersGroup4.countActive() &&
      this.invadersGroup4.getFirstAlive().x < 0
    )
      this.invadersGroup4.setVelocityX(100);
    if (
      this.invadersGroup4.countActive() &&
      this.invadersGroup4.getLast(true).x > window.innerWidth
    )
      this.invadersGroup4.setVelocityX(-100);

    //Move InvadersGroup
    if (
      this.invadersGroup.countActive() &&
      this.invadersGroup.getFirstAlive().x < 0
    )
      this.invadersGroup.setVelocityX(100);
    if (
      this.invadersGroup.countActive() &&
      this.invadersGroup.getLast(true).x > window.innerWidth
    )
      this.invadersGroup.setVelocityX(-100);

    //Win Condition
    if (!this.invadersLeft) {
      this.invadersLeft = this.initialInvaders;
      this.canPlayerShoot=0
      this.laserGroup.getChildren().forEach(child=>{
        child.setActive(false)
        child.setVisible(false)
        child.body.reset(window.innerWidth+400,-300)

      })
      if (this.actualWaves > 0) {
        this.actualWaves--;
        this.createNewWave();
        this.addColliders()
      } else {
        this.nextStageSound.play()
        setTimeout(()=>{
          this.actualWaves=this.initialWaves
          this.scene.start("5");
        },3000)
      }
    }
  }
}
