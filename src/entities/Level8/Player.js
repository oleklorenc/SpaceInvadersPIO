export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture) {
    super(scene.matter.world, x, y, texture); //w tym konstruktorze dajemy nazwe do obrazka
    this.scene = scene;
    scene.add.existing(this);
    this.setSensor(true)
    this.canMove=1

    //this.scene.physics.add.existing(this);
    //this.setCollideWorldBounds(true);
  }

  addCollider() {
    //Player-InvaderLasers Collider
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
