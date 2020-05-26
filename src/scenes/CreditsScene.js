export default class CreditsScene extends Phaser.Scene{
    constructor(){
        super({key:"Credits"})

        this.backButton
    }

    init(){

    }

    preload(){
        //this.load.image('background', 'src/assets/MainMenuBackground.png');
        //this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create(){
        this.add.image(0,0,'background').setScale(2.5)

        this.addButton(0,-400,'Back',this.backButton, 'MainMenu')

        console.log(":XDDDD")

        WebFont.load({
            google: {
                families: [ 'Freckle Face']
            },
        });
        this.add.text(window.innerWidth/2, 150, 'Kasia Sołoducha', { fontFamily: 'Freckle Face', fontSize: 40, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5,0.5);
        this.add.text(window.innerWidth/2, 200, 'Level Design and beautiful graphics', { fontFamily: 'Freckle Face', fontSize: 18, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5,0.5);

        this.add.text(window.innerWidth/2, 300, 'Cezary Wrzesiński', { fontFamily: 'Freckle Face', fontSize: 40, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5,0.5);
        this.add.text(window.innerWidth/2, 350, 'Level Design', { fontFamily: 'Freckle Face', fontSize: 18, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5,0.5);
        
        this.add.text(window.innerWidth/2, 450, 'Oskar Jankowski', { fontFamily: 'Freckle Face', fontSize: 40, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5,0.5);
        this.add.text(window.innerWidth/2, 500, 'Level Design', { fontFamily: 'Freckle Face', fontSize: 18, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5,0.5);        
        
        this.add.text(window.innerWidth/2, 600, 'Aleksander Lorenc', { fontFamily: 'Freckle Face', fontSize: 40, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5,0.5);
        this.add.text(window.innerWidth/2, 650, 'SCRUM Master aka Mistrz Młyna', { fontFamily: 'Freckle Face', fontSize: 18, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5,0.5);
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