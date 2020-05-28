export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "ship"); //w tym konstruktorze dajemy nazwe do obrazka
    this.scene = scene;
    this.canMove=1
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
  }

  addCollider() {
    //Player-PlayerLasers Collider
    this.scene.physics.add.collider(
      this,
      this.scene.laserGroup,
      (ship, laser) => {
        if (this.scene.colliderActive && laser.canKillPlayer == true) {
          this.scene.colliderActive = false;
          laser.setActive(false);
          laser.setVisible(false);
          this.setTint(0xff0000);
          this.canMove=0
          this.scene.canInvaderShoot = 0;
          this.scene.canPlayerShoot = 0;
          this.scene.gameOverSound.play({
            volume: this.scene.sys.game.globals.model.sound,
          })
          this.scene.levelMusic.stop()
          setTimeout(() => {
            this.scene.actualWaves=this.scene.initialWaves
            this.scene.invadersLeft = this.scene.initialInvaders;
            this.scene.scene.start("MainMenu");
          }, 1500);
        }
      }
    );

    //Player-InvaderLasers Collider
    this.scene.physics.add.collider(
      this,
      this.scene.invaderLaserGroup5,
      (ship, laser) => {
        if (this.scene.colliderActive) {
          this.scene.colliderActive = false;
          laser.setActive(false);
          laser.setVisible(false);
          this.setTint(0xff0000);
          this.canMove=0
          this.scene.canInvaderShoot = 0;
          this.scene.canPlayerShoot = 0;
          this.scene.gameOverSound.play({
            volume: this.scene.sys.game.globals.model.sound,
          })
          this.scene.levelMusic.stop()
          setTimeout(() => {
            this.scene.actualWaves=this.scene.initialWaves
            this.scene.invadersLeft = this.scene.initialInvaders;
            this.scene.scene.start("MainMenu");
          }, 1500);
        }
      }
    );

    //Player-PlayerLasers Collider
    this.scene.physics.add.collider(
      this,
      this.scene.invaderLaserGroup,
      (ship, laser) => {
        if (this.scene.colliderActive) {
          this.scene.colliderActive = false;
          laser.setActive(false);
          laser.setVisible(false);
          this.setTint(0xff0000);
          this.canMove = 0;
          this.scene.canInvaderShoot = 0;
          this.scene.canPlayerShoot=0
          this.scene.gameOverSound.play({
            volume: this.scene.sys.game.globals.model.sound,
          })
          this.scene.levelMusic.stop()
          setTimeout(() => {
            this.scene.actualWaves = this.scene.initialWaves;
            this.scene.invadersLeft = this.scene.initialInvaders;
            this.scene.scene.start("MainMenu");
          }, 1500);
        }
      }
    );
  }
}
