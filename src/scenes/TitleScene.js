export default class MainMenuScene extends Phaser.Scene{
    constructor(){
        super({key: "MainMenu"})
        this.model
        this.bgMusic
    }

    init(){

    }

    preload(){
        
        
    }

    create(){
        
        this.add.image(0,0,'background').setScale(2.5)
        this.addButton(0,200,'Play Game',this.playButton,"Level1")
        this.addButton(0,0,'Options', this.optionsButton, "Options")
        this.addButton(0,-200,'Credits',this.creditsButton, "Credits")
        this.addButton(0,-400,'Choose Level',this.creditsButton, "ChooseLevel")


    }

    update(){
        
    }

    addButton(x,y,text,button,scene){
        button=
        this.add.text(x, y, text, { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => {
             this.scene.start(scene)
            })
        .on('pointerover', () => button.setStyle({ fill: '#ff0'}) )
        .on('pointerout', () => button.setStyle({ fill: '#0f0'}) )
        .setFontSize(50)
        .setOrigin(0.5,0.5)
        .setPosition(window.innerWidth/2,window.innerHeight/2-y)
    }
}