import * as THREE from 'three';
import Input from './input.es6';
import Socket from './socket.es6';
import Bat from './bat.es6';

export default class Game {
	constructor() {
		// Set the stage
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer();

		// Add to DOM
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		this.input = new Input();

		// Set up websocket communication
		this.socket = new Socket('//pong.io');
		this.socket.registerReady(() => { this.ready(); });
		this.socket.registerStart(() => { this.start(); });

		// Highlight the first element since this is our player
		this.bats = [
			new Bat({ horizontal: 'right', vertical: 'top' }, 0xffff00),
			new Bat({ horizontal: 'right', vertical: 'bottom' }, 0x00ffff),
			new Bat({ horizontal: 'left', vertical: 'top' }),
			new Bat({ horizontal: 'left', vertical: 'bottom' })
		];

		this.scene.add(this.bats[0]);
		this.scene.add(this.bats[1]);
		this.scene.add(this.bats[2]);
		this.scene.add(this.bats[3]);

		this.camera.position.z = 5;

		this.animate();
	}

	animate() {
		requestAnimationFrame(() => {
			this.animate();
		});

		let inputs = this.input.getButtonStates();
		this.bats[0].move(inputs[0]);
		this.bats[1].move(inputs[1]);

		this.renderer.render(this.scene, this.camera);
	}

	ready() {

	}

	start() {
		this.input.enable();
	}
}

const game = new Game();