import Phaser from "phaser";
import BootScene from "./scenes/BootScene.js"
import PreloaderScene from "./scenes/PreloaderScene.js"
import TitleScene from "./scenes/TitleScene.js"
import OptionsScene from "./scenes/OptionsScene.js"
import CreditsScene from "./scenes/CreditsScene.js"
import Level1Scene from './scenes/Level1Scene.js'
import Level2Scene from './scenes/Level2Scene.js'
import Level3Scene from "./scenes/Level3Scene.js";
import Level4Scene from "./scenes/Level4Scene.js";
import Level5Scene from "./scenes/Level5Scene.js";
import Level6Scene from "./scenes/Level6Scene.js";
import Level7Scene from "./scenes/Level7Scene.js";
import Level8Scene from "./scenes/Level8Scene.js";

import ChooseLevelScene from "./scenes/ChooseLevelScene.js";
import Model from './scenes/Model.js';

import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';


const config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: { y: 0 }
		}
	},
	plugins: {
        scene: [{
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
        },
        // ...
        ]
    },
	scene: [BootScene,PreloaderScene,TitleScene,OptionsScene,CreditsScene,Level1Scene,Level2Scene,Level3Scene,Level4Scene, Level5Scene, Level6Scene, Level7Scene, Level8Scene, ChooseLevelScene]
};

const game = new Phaser.Game(config);

const model = new Model();
game.globals = { model };