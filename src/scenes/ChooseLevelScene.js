export default class ChooseLevelScene extends Phaser.Scene{
    constructor(){
        super({key:"ChooseLevel"})

        this.backButton
        this.level1Button
        this.level2Button
        this.level2Button
        this.level4Button
        this.level5Button
        this.level6Button
        this.level7Button
        this.level8Button
    }

    init(){

    }

    preload(){
        this.load.image('background', 'src/assets/MainMenuBackground.png');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('invader1', 'src/assets/sprites/GreenAlien.png')
        this.load.image('invader2', 'src/assets/sprites/RedAlien.png')
        this.load.image('invader3', 'src/assets/sprites/PinkAlien.png')
        this.load.image('invader4', 'src/assets/sprites/YellowAlien.png')
        this.load.image('invader5', 'src/assets/sprites/BlueAlien.png')
        this.load.image('invader6', 'src/assets/sprites/PurpleAlien.png')
        this.load.image('invader7', 'src/assets/orangeAlien.png')
    }

    create(){
        this.add.image(0,0,'background').setScale(2.5)

        this.addButton(0,-400,'Back',this.backButton, 'Options')
        this.addButton(-500, 400, 'Level 1', this.level1Button, 'Level1')
        this.addButton(0, 400, 'Level 2', this.level2Button, 'Level2')
        this.addButton(500, 400, 'Level 3', this.level3Button, 'Level3')
        this.addButton(-500, 150, 'Level 4', this.level4Button, 'Level4')
        this.addButton(0, 150, 'Level 5', this.level5Button, 'Level5')
        this.addButton(500, 150, 'Level 6', this.level6Button, 'Level6')
        this.addButton(0, -100, 'Level 7', this.level7Button, 'Level7')

        this.add.image(window.innerWidth/2 - 500, window.innerHeight/2 - 275, 'invader1').setScale(0.4)
        this.add.image(window.innerWidth/2, window.innerHeight/2 - 275, 'invader2').setScale(0.066)
        this.add.image(window.innerWidth/2 + 500, window.innerHeight/2 - 275, 'invader3').setScale(0.4)
        this.add.image(window.innerWidth/2 - 500, window.innerHeight/2 - 25, 'invader4').setScale(0.085)
        this.add.image(window.innerWidth/2, window.innerHeight/2 - 25, 'invader5').setScale(0.4)
        this.add.image(window.innerWidth/2 + 500, window.innerHeight/2 - 25, 'invader6').setScale(0.4)
        this.add.image(window.innerWidth/2, window.innerHeight/2 + 250, 'invader7').setScale(0.4)

        console.log(":XDDDD")

        WebFont.load({
            google: {
                families: [ 'Freckle Face']
            },
        });
    }

    update(){

    }

    addButton(x,y,text,button, scene){
        button=
        this.add.text(x, y, text, { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => { this.scene.start(scene)})
        .on('pointerover', () => button.setStyle({ fill: '#ff0'}) )
        .on('pointerout', () => button.setStyle({ fill: '#0f0'}) )
        .setFontSize(50)
        .setOrigin(0.5,0.5)
        .setPosition(window.innerWidth/2+x,window.innerHeight/2-y)
    }
}