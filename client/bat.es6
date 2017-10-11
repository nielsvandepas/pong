import * as THREE from 'three';

export default class Bat extends THREE.Mesh {
	constructor(gridPosition, highlight) {
		const geometry = new THREE.BoxGeometry(Bat.width, Bat.height, Bat.depth);
		const material = new THREE.MeshBasicMaterial({
			color: highlight ? highlight : 0xffffff
		});

		super(geometry, material);

		this.geometry = geometry;
		this.material = material;

		this.gridPosition = gridPosition;

		this.position.x = gridPosition.horizontal == 'left' ? -6.5 : 6.5;
		this.position.y = gridPosition.vertical == 'top' ? 2 : -2;
	}

	move(input) {
		if (input.up)
			this.position.y += Bat.moveSpeed;

		if (input.down)
			this.position.y -= Bat.moveSpeed;

		this.restrictPosition();
	}

	restrictPosition() {
		if (this.gridPosition.vertical == 'top' && this.position.y - (Bat.height / 2) < 0)
			this.position.y = Bat.height / 2;
		else if (this.gridPosition.vertical == 'bottom' && this.position.y + (Bat.height / 2) > 0)
			this.position.y = -Bat.height / 2;
	}
}

Bat.width = 0.25;
Bat.height = 1;
Bat.depth = 0.25;

Bat.moveSpeed = 0.1;