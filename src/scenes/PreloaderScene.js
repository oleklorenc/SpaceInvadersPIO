export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    
    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(75, 75, window.innerWidth-175, 250);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(100, 100, 1500 * value, 200);
    });

    // update file progress text
    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.key);
    });


    //Images
    this.load.image('background', 'src/assets/sprites/MainMenuBackground.png');
    this.load.image("scrollBackground", "src/assets/sprites/background.png");
    this.load.image("laser", "src/assets/sprites/playerLaser.png");
    this.load.image("invaderLaser", "src/assets/sprites/invaderLaser.png");
    this.load.image("invader", "src/assets/sprites/GreenAlien.png");
    this.load.image("invader2", "src/assets/sprites/RedAlien.png");
    this.load.image("invaderLevel3", "src/assets/sprites/PinkAlien.png");
    this.load.image("invader4", "src/assets/sprites/YellowAlien.png");
    this.load.image("ship", "src/assets/sprites/ship.png");
    this.load.image("invader5", "src/assets/sprites/BlueAlien.png");
    this.load.image("shield", "src/assets/sprites/shield.png");
    this.load.image("invader6", "src/assets/sprites/CreamAlien.png");
    this.load.image("invader7", "src/assets/orangeAlien.png");
    this.load.image("bossInvader", "src/assets/sprites/bossInvader.png")
    this.load.spritesheet("bossLaser", "src/assets/sprites/bossLaser.png", {frameWidth: 512, frameHeight: 512})


    this.load.image('missileFly1', "src/assets/sprites/Explosion/Missile_1_Flying_000.png")
    this.load.image('missileFly2', "src/assets/sprites/Explosion/Missile_1_Flying_001.png")
    this.load.image('missileFly3', "src/assets/sprites/Explosion/Missile_1_Flying_002.png")
    this.load.image('missileFly4', "src/assets/sprites/Explosion/Missile_1_Flying_003.png")
    this.load.image('missileFly5', "src/assets/sprites/Explosion/Missile_1_Flying_004.png")
    this.load.image('missileFly6', "src/assets/sprites/Explosion/Missile_1_Flying_005.png")
    this.load.image('missileFly7', "src/assets/sprites/Explosion/Missile_1_Flying_006.png")
    this.load.image('missileFly8', "src/assets/sprites/Explosion/Missile_1_Flying_007.png")
    this.load.image('missileFly9', "src/assets/sprites/Explosion/Missile_1_Flying_008.png")

    this.load.image('missileBoom1', "src/assets/sprites/Explosion/Missile_1_Explosion_000.png")
    this.load.image('missileBoom2', "src/assets/sprites/Explosion/Missile_1_Explosion_001.png")
    this.load.image('missileBoom3', "src/assets/sprites/Explosion/Missile_1_Explosion_002.png")
    this.load.image('missileBoom4', "src/assets/sprites/Explosion/Missile_1_Explosion_003.png")
    this.load.image('missileBoom5', "src/assets/sprites/Explosion/Missile_1_Explosion_004.png")
    this.load.image('missileBoom6', "src/assets/sprites/Explosion/Missile_1_Explosion_005.png")
    this.load.image('missileBoom7', "src/assets/sprites/Explosion/Missile_1_Explosion_006.png")
    this.load.image('missileBoom8', "src/assets/sprites/Explosion/Missile_1_Explosion_007.png")
    this.load.image('missileBoom9', "src/assets/sprites/Explosion/Missile_1_Explosion_008.png")

    //Sounds
    this.load.audio("laserSound", ["src/assets/sounds/laser_sound.mp3"]);
    this.load.audio("invaderHit", ["src/assets/sounds/invaderHit.mp3"]);
    this.load.audio("invaderDieSound", ["src/assets/sounds/invader_die_sound.mp3"]);
    this.load.audio("gameOverSound", ["src/assets/sounds/gameOverSound.mp3"]);
    this.load.audio("invaderLaserSound", ["src/assets/sounds/invaderLaserSound.mp3"]);
    this.load.audio("nextStageSound", ["src/assets/sounds/nextStageSound.mp3"]);
    this.load.audio("shieldSound", ["src/assets/sounds/shieldSound.mp3"]);
    this.load.audio("shieldHit", ["src/assets/sounds/Shield_Hit.mp3"]);

    // remove progress bar when complete
    this.load.on(
      "complete",
      function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      }.bind(this)
    );

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  }

  init () {
    this.readyCount = 0;
  }
   
  ready () {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('MainMenu');
    }
  }

  create() {
      this.scene.start('MainMenu')
  }
}
