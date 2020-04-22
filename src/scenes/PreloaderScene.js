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
    this.load.image('background', 'src/assets/MainMenuBackground.png');
    this.load.image("scrollBackground", "src/assets/background.png");
    this.load.image("laser", "src/assets/playerLaser.png");
    this.load.image("invaderLaser", "src/assets/invaderLaser.png");
    this.load.image("invader", "src/assets/alien.png");
    this.load.image("ship", "src/assets/ship.png");
    //Sounds
    this.load.audio("laserSound", ["src/assets/laser_sound.mp3"]);
    this.load.audio("invaderDieSound", ["src/assets/invader_die_sound.mp3"]);
    this.load.audio("gameOverSound", ["src/assets/gameOverSound.mp3"]);
    this.load.audio("invaderLaserSound", ["src/assets/invaderLaserSound.mp3"]);
    this.load.audio("mainMusic", ["src/assets/spaceInvadersTheme.mp3"]);

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
