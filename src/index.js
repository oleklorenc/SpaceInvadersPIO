import Phaser from "phaser";
import BootScene from "./scenes/BootScene.js"
import PreloaderScene from "./scenes/PreloaderScene.js"
import TitleScene from "./scenes/TitleScene.js"
import GameScene from './scenes/GameScene.js'
import Level1Scene from './scenes/Level1Scene.js'
import OptionsScene from "./scenes/OptionsScene.js"
import CreditsScene from "./scenes/CreditsScene.js"

import Model from './scenes/Model.js';
import Level4Scene from "./scenes/Level4Scene.js";

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
	scene: [BootScene,PreloaderScene,TitleScene,GameScene,Level1Scene,OptionsScene,CreditsScene, Level4Scene]
};

const game = new Phaser.Game(config);

const model = new Model();
game.globals = { model };