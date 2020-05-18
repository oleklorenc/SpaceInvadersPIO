import PlayerLaserGroup from "../entities/Level5/PlayerLaserGroup";
import InvaderLaserGroup5 from "../entities/Level5/InvaderLaserGroupLvl5";
import InvaderGroup5 from "../entities/Level5/InvaderGroupLvl5";
import InvaderLaserGroup from "../entities/Level1/InvaderLaserGroup";
import InvaderGroup from "../entities/Level1/InvaderGroup";
import Player from "../entities/Level5/Player";
import ShieldGroup from "../entities/Level5/ShieldGroup";

export default class Level5Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level5" });

    //Objects
    this.player;
    this.laserGroup;
    this.invaderLaserGroup5;  //level 5 LaserGroup
    this.invaderLaserGroup; //basic LaserGropu
    this.invadersGroup5;  //level 5 InvaderGroup
    this.invadersGroup; //basic InvaderGroup
    this.background;
    this.inputKeys;
    this.cursors;
    this.initialInvaders=16
    this.invadersLeft = this.initialInvaders;
    this.initialWaves=2
    this.actualWaves = this.initialWaves; // =n actual waves=n+1 zrobione: 1,2
    this.shieldGroup;

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



    //Objects
    this.laserGroup = new PlayerLaserGroup(this, -300, -300);
    this.createNewWave();
    this.invaderLaserGroup5 = new InvaderLaserGroup5(this,-500,500);
    this.invaderLaserGroup = new InvaderLaserGroup(this,-500,500);

    //Game Options
    this.movementSpeed = 500;
    this.canInvaderShoot = 1;
    this.colliderActive = true;

    //Sounds
    this.laserSound = this.sound.add("laserSound");
    this.invaderDieSound = this.sound.add("invaderDieSound");
    this.gameOverSound = this.sound.add("gameOverSound");
    this.invaderLaserSound = this.sound.add("invaderLaserSound");
    this.nextStageSound=this.sound.add("nextStageSound");
    this.shieldSound = this.sound.add("shieldSound");

    this.player=new Player(this,this.cameras.main.width / 2,this.cameras.main.height-50)
    this.player.addCollider()
    this.addEvents();

    //Invader shoot events
    var timer1 = this.time.addEvent({
      delay: 1000, // ms
      callback: () => {
        this.invadersGroup5.fireInvaderLaser();
      },
      args: [this],
      loop: true,
    });

    var timer2 = this.time.addEvent({
      delay: 1000, // ms
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
    this.invadersGroup5 = new InvaderGroup5(this, 0, 0, -200, -200);
    this.invadersGroup = new InvaderGroup(this, 120, 100, window.innerWidth+200, -200);
    this.shieldGroup = new ShieldGroup(this, 0, 0, -200, -200);

    this.invadersGroup5.setInvaders();
    this.invadersGroup5.setVelocityX(-100);

    this.shieldGroup.setShields();
    this.shieldGroup.setVelocityX(-100);

    this.invadersGroup.setInvaders();
    this.invadersGroup.setVelocityX(100);
  }

  

  addColliders() {
    //PlayerLasers-Shield Collider
    this.physics.add.collider(
      this.shieldGroup,
      this.laserGroup,
      (shield, laser) => {
        this.shieldSound.play();
        shield.setActive(false)
        console.log(shield.active)
        shield.disableBody(true,true)
        laser.setVelocityY(1000) //SET LASERS X AFTER COLLISION- AVOID DOUBLE HIT
        laser.canKillPlayer = true;
      }
    )

    //PlayerLasers-Invaders Collider
    this.physics.add.collider(
      this.invadersGroup5,
      this.laserGroup,
      (invader, laser) => {
        this.invaderDieSound.play();
        invader.setActive(false)
        console.log(invader.active)
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
        console.log(invader.active)
        laser.setX(-100) //SET LASERS X AFTER COLLISION- AVOID DOUBLE HIT

        
        this.invadersLeft--;
      }
    );
  }

  update(time, delta) {
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
    else this.player.setVelocityX(0);

    //Move InvadersGroup5 with shieldGroup
    if (
      this.invadersGroup5.countActive() &&
      this.invadersGroup5.getFirstAlive().x < 0
    ) {
      this.invadersGroup5.setVelocityX(100);
      this.shieldGroup.setVelocityX(100);
    }
    if (
      this.invadersGroup5.countActive() &&
      this.invadersGroup5.getLast(true).x > window.innerWidth
    ) {
      this.invadersGroup5.setVelocityX(-100);
      this.shieldGroup.setVelocityX(-100);
    }

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
          this.scene.start("Level5");
        },3000)
      }
    }
  }
}
