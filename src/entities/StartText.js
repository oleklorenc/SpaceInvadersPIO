export default class StartText extends Phaser.GameObjects.Text{
    constructor(scene,x,y, text){
        super(scene,x,y,text,{ fontSize: '128px', align: 'center', color: '#00ff00' })
        this.setOrigin(0.5)
        scene.add.existing(this)
    }


}