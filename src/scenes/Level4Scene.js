import PlayerLaserGroup from "../entities/PlayerLaserGroup";
import InvaderLaserGroup4 from "../entities/InvaderLaserGroupLvl4";
import InvaderGroup4 from "../entities/InvaderGroupLvl4";
import InvaderLaserGroup from "../entities/InvaderLaserGroup";
import InvaderGroup from "../entities/InvaderGroup";
import Level1Scene from "./Level1Scene";

export default class Level4Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level4" });

    //Objects
    this.ship;
    this.laserGroup;
    this.invaderLaserGroup4;  //level 4 LaserGroup
    this.invaderLaserGroup; //basic LaserGropu
    this.invadersGroup4;  //level 4 InvaderGroup
    this.invadersGroup; //basic InvaderGroup
    this.background;
    this.inputKeys;
    this.cursors;
    this.initialInvaders=13
    this.invadersLeft = this.initialInvaders;
    this.initialWaves=2
    this.actualWaves = this.initialWaves; // =n actual waves=n+1 zrobione: 1,2

    //Game Options
    this.movementSpeed;
    this.canMove;
    this.canInvaderShoot;
    this.colliderActive;
    this.canPlayerShoot=0

    //Sounds
    this.invaderLaserSound;
    this.invaderDieSound;
    this.laserSound;

    //Score:
    this.score = 0;
    this.scoreText;
  }

  preload() {console.log('adsad');}

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

      this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

    //Objects
    this.laserGroup = new PlayerLaserGroup(this, -300, -300);
    this.createNewWave();
    this.invaderLaserGroup4 = new InvaderLaserGroup4(this,-800,800); //elvis
    this.invaderLaserGroup = new InvaderLaserGroup(this,-500,500);

    //Game Options
    this.movementSpeed = 400;
    this.canMove = 1;
    this.canInvaderShoot = 1;
    this.colliderActive = true;

    //Sounds
    this.laserSound = this.sound.add("laserSound");
    this.invaderDieSound = this.sound.add("invaderDieSound");
    this.invaderLaserSound = this.sound.add("invaderLaserSound");
    this.lostSound = this.sound.add("lost");
    this.nextStage = this.sound.add("nextStage");
    this.stageMusic = this.sound.add("stage4");
    this.stageMusic.play();

    //Add player ship, input listeners, collide ship with world bounds
    this.addShip();
    this.addEvents();
    this.ship.setCollideWorldBounds(true);


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

    //Player-InvaderLasers Colliders
    this.physics.add.collider(
      this.ship,
      this.invaderLaserGroup4,
      (ship, laser) => {
        if (this.colliderActive) {
          this.colliderActive = false;
          laser.setActive(false);
          laser.setVisible(false);
          this.ship.setTint(0xff0000);
          this.canMove = 0;
          this.canInvaderShoot = 0;
          this.stageMusic.stop();
          this.lostSound.play();
          setTimeout(() => {
            this.actualWaves=this.initialWaves
            this.invadersLeft = this.initialInvaders;
            this.scene.start("MainMenu");
          }, 3200);
        }
      }
    );

    this.physics.add.collider(
      this.ship,
      this.invaderLaserGroup,
      (ship, laser) => {
        if (this.colliderActive) {
          this.colliderActive = false;
          laser.setActive(false);
          laser.setVisible(false);
          this.ship.setTint(0xff0000);
          this.canMove = 0;
          this.canInvaderShoot = 0;
          this.stageMusic.stop();
          this.lostSound.play();
          setTimeout(() => {
            this.actualWaves=this.initialWaves
            this.invadersLeft = this.initialInvaders;
            this.scene.start("MainMenu");
          }, 3200);
        }
      }
    );
  }

  

  addShip() {
    const centerX = this.cameras.main.width / 2;
    const bottom = this.cameras.main.height;
    this.ship = this.physics.add.image(centerX, bottom - 50, "ship");
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
        console.log(invader.active)
        invader.disableBody(true,true)
        laser.setX(-100) //SET LASERS X AFTER COLLISION- AVOID DOUBLE HIT
        this.score += 10;
        this.scoreText.setText('Score: '+ this.score);
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

        this.score += 10;
        this.scoreText.setText('Score: '+ this.score);
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
          this.laserGroup.fireBullet(this.ship.x, this.ship.y - 20);
          this.laserSound.play();
        }
      }
    });

    //Move Player Ship
    if (this.canMove && this.cursors.left.isDown)
      this.ship.setVelocityX(-this.movementSpeed);
    else if (this.canMove && this.cursors.right.isDown)
      this.ship.setVelocityX(this.movementSpeed);
    else if (this.canMove && this.cursors.up.isDown)
      this.ship.setVelocityY(-this.movementSpeed)
    else if (this.canMove && this.cursors.down.isDown)
      this.ship.setVelocityY(this.movementSpeed)
    else {
      this.ship.setVelocityX(0);
      this.ship.setVelocityY(0);
    }
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
        //this.scene.stop();
       // this.scene.start("MainMenu");
      })
      //})
      if (this.actualWaves > 0) {
        this.actualWaves--;
        this.createNewWave();
        this.addColliders()
      } else {
        this.stageMusic.stop();
        this.actualWaves=this.initialWaves
        this.scene.start("MainMenu");
      }
    }
  }


}
