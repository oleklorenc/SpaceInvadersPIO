export default class CreditsScene extends Phaser.Scene{
    constructor(){
        super({key:"Credits"})

        this.backButton
    }

    init(){

    }

    preload(){
		this.load.image('background', 'src/assets/MainMenuBackground.png');
    }

    create(){
        this.add.image(0,0,'background').setScale(2.5)
        this.add.text(0,0,"Credits")
        .setOrigin(0.5,0.5)
        .setPosition(window.innerWidth/2,window.innerHeight/2-200)
        this.addButton(0,0,'Back',this.backButton, 'MainMenu')
        

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
        .setPosition(window.innerWidth/2,window.innerHeight/2-y)
    }
}