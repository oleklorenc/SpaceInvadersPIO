import Phaser from "phaser";
import BootScene from "./scenes/BootScene.js"
import PreloaderScene from "./scenes/PreloaderScene.js"
import TitleScene from "./scenes/TitleScene.js"
import GameScene from './scenes/GameScene.js'
import Level1Scene from './scenes/Level1Scene.js'
import OptionsScene from "./scenes/OptionsScene.js"
import CreditsScene from "./scenes/CreditsScene.js"
import LevelTest from "./scenes/LevelTest.js"

import Model from './scenes/Model.js';

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
	scene: [BootScene,PreloaderScene,TitleScene,GameScene,Level1Scene,OptionsScene,CreditsScene,LevelTest]
};

const game = new Phaser.Game(config);

const model = new Model();
game.globals = { model };