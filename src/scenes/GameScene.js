import PlayerLaserGroup from "../entities/PlayerLaserGroup";
import InvaderLaserGroup from "../entities/InvaderLaserGroup";
import InvaderGroup from "../entities/InvaderGroup";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });

    //Objects
    this.ship;
    this.laserGroup;
    this.invaderLaserGroup;
    this.invadersGroup;
    this.background;
    this.inputKeys;
    this.cursors;
    this.invadersLeft = 8;
    this.text;

    //Game Options
    this.movementSpeed;
    this.canMove;
    this.canInvaderShoot;
    this.colliderActive

    //Sounds
    this.invaderLaserSound;
    this.invaderDieSound;
    this.laserSound;
    this.bgMusic;
  }

  preload() {

  }

  create() {

    this.cursors = this.input.keyboard.createCursorKeys();
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
    this.laserGroup = new PlayerLaserGroup(this);
    this.invadersGroup = new InvaderGroup(this);
    this.invaderLaserGroup = new InvaderLaserGroup(this);

    //Game Options
    this.movementSpeed = 500;
    this.canMove = 1;
    this.canInvaderShoot = 1;
    this.colliderActive=true

    //Sounds
    this.laserSound = this.sound.add("laserSound");
    this.invaderDieSound = this.sound.add("invaderDieSound");
    this.gameOverSound = this.sound.add("gameOverSound");
    this.invaderLaserSound = this.sound.add("invaderLaserSound");


    this.invadersGroup.setInvaders();
    this.invadersGroup.setVelocityX(-100);

    this.addShip();
    this.addEvents();
    this.ship.setCollideWorldBounds(true);

    //Invader shoot event
    var timer = this.time.addEvent({
      delay: 3000, // ms
      callback: () => {
        this.invadersGroup.fireInvaderLaser();
      },
      args: [this],
      loop: true,
    });

    //PlayerLasers-Invaders Collider
    this.physics.add.collider(
      this.invadersGroup,
      this.laserGroup,
      (invader, laser) => {
        this.invaderDieSound.play();
        invader.destroy();
        laser.setActive(false);
        laser.setVisible(false);
        this.invadersLeft--;
      }
    );

    //Player-InvaderLasers Collider
    this.physics.add.collider(
      this.ship,
      this.invaderLaserGroup,
      (ship, laser) => {
        if(this.colliderActive){
          this.colliderActive=false
          laser.setActive(false);
          laser.setVisible(false);
          laser.body.reset(0, 0);
          this.ship.setTint(0xff0000);
          this.canMove = 0;
          this.canInvaderShoot = 0;
          setTimeout(() => {
            this.invadersLeft = 8;
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

  addEvents() {
    // Fire Laser on Pointerdown
    /*
    this.input.on("pointerdown", (pointer) => {
      this.fireBullet();
    });*/

    // Fire Laser on Spacedown or Enterdown
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];
  }

  update(time, delta) {
    //Scroll Background
    this.background.tilePositionY -= 1.5;

    //Fire Laser
    this.inputKeys.forEach((key) => {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        this.laserGroup.fireBullet(this.ship.x, this.ship.y - 20);
        this.laserSound.play();
      }
    });

    //Move Player Ship
    if (this.canMove && this.cursors.left.isDown)
      this.ship.setVelocityX(-this.movementSpeed);
    else if (this.canMove && this.cursors.right.isDown)
      this.ship.setVelocityX(this.movementSpeed);
    else this.ship.setVelocityX(0);

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
      this.invadersLeft = 8;
      this.scene.start("MainMenu");
    }
  }
}
