<<<<<<< HEAD
import PlayerLaserGroupLevel3 from "../entities/PlayerLaserGroupLevel3";
import InvaderLaserGroup from "../entities/InvaderLaserGroup";
import InvaderGroup from "../entities/InvaderGroup";
import InvaderGroupLevel3 from "../entities/InvaderGroupLevel3";

export default class Level3Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level3Scene" });

    //Objects
    this.ship;
=======
import PlayerLaserGroupLevel3 from "../entities/Level3/PlayerLaserGroupLevel3";
import InvaderLaserGroup from "../entities/Level1/InvaderLaserGroup";
import InvaderGroup from "../entities/Level1/InvaderGroup";
import InvaderGroupLevel3 from "../entities/Level3/InvaderGroupLevel3";
import Player from "../entities/Level3/Player";

export default class Level3Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level3" });

    //Objects
    this.player;
>>>>>>> master
    this.laserGroup;
    this.invaderLaserGroup;
    this.invadersGroup1;
    this.background;
    this.inputKeys;
    this.cursors;
    this.initialInvaders=16
    this.invadersLeft = this.initialInvaders;
    this.initialWaves=2
    this.actualWaves = this.initialWaves; // =n actual waves=n+1 zrobione: 1,2
    this.visible = true;

    //Game Options
    this.movementSpeed;
<<<<<<< HEAD
    this.canMove;
=======
>>>>>>> master
    this.canInvaderShoot;
    this.colliderActive;
    this.canPlayerShoot=0

    //Sounds
    this.invaderLaserSound;
    this.invaderDieSound;
    this.laserSound;
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
    this.laserGroup = new PlayerLaserGroupLevel3(this, -300, -300, this.initialInvaders*2);
    this.createNewWave();
    this.invaderLaserGroup = new InvaderLaserGroup(this,-500,500);

    //Game Options
    this.movementSpeed = 500;
<<<<<<< HEAD
    this.canMove = 1;
=======
>>>>>>> master
    this.canInvaderShoot = 1;
    this.colliderActive = true;

    //Sounds
    this.laserSound = this.sound.add("laserSound");
    this.invaderDieSound = this.sound.add("invaderDieSound");
    this.invaderHitSOund = this.sound.add("invaderHit")
    this.gameOverSound = this.sound.add("gameOverSound");
    this.invaderLaserSound = this.sound.add("invaderLaserSound");

    //Add player ship, input listeners, collide ship with world bounds
<<<<<<< HEAD
    this.addShip();
    this.addEvents();
    this.ship.setCollideWorldBounds(true);
=======
    this.player=new Player(this,this.cameras.main.width / 2,this.cameras.main.height-50)
    this.player.addCollider()
    //this.addShip();
    this.addEvents();
    //this.ship.setCollideWorldBounds(true);
>>>>>>> master


    //Invader shoot events
    var timer1 = this.time.addEvent({
      delay: 1500, // ms
      callback: () => {
        this.invadersGroup1.fireInvaderLaser();
      },
      args: [this],
      loop: true,
    });
    var timer2 = this.time.addEvent({
      delay: 2000, // ms
      callback: () => {
        this.invadersGroup2.fireInvaderLaser();
      },
      args: [this],
      loop: true,
    });

    //InvadersGroup-PlayerLaser colliders
    this.addColliders();
<<<<<<< HEAD

    //Player-InvaderLasers Collider
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
          setTimeout(() => {
            this.actualWaves=this.initialWaves
            this.invadersLeft = this.initialInvaders;
            this.scene.start("MainMenu");
          }, 1500);
        }
      }
    );
  }

  addShip() {
    const centerX = this.cameras.main.width / 2;
    const bottom = this.cameras.main.height;
    this.ship = this.physics.add.image(centerX, bottom - 50, "ship");
  }

=======
  }
>>>>>>> master
  addEvents() {

    // Fire Laser on Spacedown or Enterdown
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];
  }

  createNewWave() {
    this.invadersGroup1 = new InvaderGroupLevel3(this, 0, 0, -200, -200);
    this.invadersGroup2 = new InvaderGroup(this, 120, 100, window.innerWidth+200, -200);

    this.invadersGroup1.setInvaders();
    this.invadersGroup1.setVelocityX(-100);

    this.invadersGroup2.setInvaders();
    this.invadersGroup2.setVelocityX(100);
  }

  addColliders() {
    //PlayerLasers-Invaders Collider
    this.physics.add.collider(
      this.invadersGroup1,
      this.laserGroup,
      (invader, laser) => {
        if(invader.invaderhealth==0)
        {
            this.invaderDieSound.play();
            invader.setActive(false)
            console.log(invader.active)
            invader.disableBody(true,true)
            laser.setX(-100) //SET LASERS X AFTER COLLISION- AVOID DOUBLE HIT
            this.invadersLeft--;
        }
        else
        {
          invader.setActive(true)
          console.log(invader.active)
          this.invaderHitSOund.play();
          laser.setX(-100) //SET LASERS X AFTER COLLISION- AVOID DOUBLE HIT
          invader.invaderhealth--;
        }
      }
    );
    this.physics.add.collider(
      this.invadersGroup2,
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
<<<<<<< HEAD
          this.laserGroup.fireBullet(this.ship.x, this.ship.y - 20);
=======
          this.laserGroup.fireBullet(this.player.x, this.player.y - 20);
>>>>>>> master
          this.laserSound.play();
        }
      }
    });

    //Move Player Ship
<<<<<<< HEAD
    if (this.canMove && this.cursors.left.isDown)
      this.ship.setVelocityX(-this.movementSpeed);
    else if (this.canMove && this.cursors.right.isDown)
      this.ship.setVelocityX(this.movementSpeed);
    else this.ship.setVelocityX(0);
=======
    if (this.player.canMove && this.cursors.left.isDown)
      this.player.setVelocityX(-this.movementSpeed);
    else if (this.player.canMove && this.cursors.right.isDown)
      this.player.setVelocityX(this.movementSpeed);
    else this.player.setVelocityX(0);
>>>>>>> master

    //Move InvadersGroup 1
    if(this.invadersGroup1.countActive() && this.invadersGroup1.getFirstAlive().x < 0)
      this.invadersGroup1.setVelocityX(100);
    if(this.invadersGroup1.countActive() && this.invadersGroup1.getLast(true).x > window.innerWidth)
      this.invadersGroup1.setVelocityX(-100);

    //Move InvadersGroup 2
    if(this.invadersGroup2.countActive() &&this.invadersGroup2.getFirstAlive().x < 0)
      this.invadersGroup2.setVelocityX(100);
    if(this.invadersGroup2.countActive() && this.invadersGroup2.getLast(true).x > window.innerWidth)
      this.invadersGroup2.setVelocityX(-100);


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
        this.actualWaves=this.initialWaves
        this.scene.start("MainMenu");
      }
    }
  }
}
