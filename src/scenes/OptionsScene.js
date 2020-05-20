const COLOR_PRIMARY = 0x95F327;
const COLOR_LIGHT = 0x689633;
const COLOR_DARK = 0x260e04;

export default class OptionsScene extends Phaser.Scene{
    constructor(){
        super({key:"Options"})

        this.backButton
    }

    init(){

    }

    preload(){
        this.load.image('background', 'src/assets/MainMenuBackground.png');
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    }

    create(){
        this.add.image(0,0,'background').setScale(2.5)
        this.add.text(window.innerWidth/2, 150, 'Options', { fontFamily: 'Freckle Face', fontSize: 60, color: '#ffffff' })
        .setShadow(2, 2, "#333333", 2, false, true)
        .setOrigin(0.5,0.5);
        this.addButton(0,-400,'Back',this.backButton, 'MainMenu')
        
        
        this.add.text(window.innerWidth/2, 350, 'Difficulty', { fontFamily: 'Freckle Face', fontSize: 40, color: '#ffffff' })
        .setShadow(2, 2, "#333333", 2, false, true)
        .setOrigin(0.5,0.5);
        this.rexUI.add.slider({
            x: window.innerWidth/2,
            y: 450,
            width: 350,
            height: 20,
            orientation: 'x',

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

            valuechangeCallback: function (value) {
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag', // 'drag'|'click'
        })
            .layout();

            
            this.add.text(window.innerWidth/2, 550, 'Volume', { fontFamily: 'Freckle Face', fontSize: 40, color: '#ffffff' })
            .setShadow(2, 2, "#333333", 2, false, true)
            .setOrigin(0.5,0.5);
            this.rexUI.add.slider({
                x: window.innerWidth/2,
                y: 650,
                width: 350,
                height: 20,
                orientation: 'x',
    
                track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
                indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
    
                valuechangeCallback: function (value) {
                },
                space: {
                    top: 4,
                    bottom: 4
                },
                input: 'drag', // 'drag'|'click'
            })
                .layout();

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