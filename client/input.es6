export default class Input {
	constructor() {
		this.enabled = false;

		this.pressedButtons = [{
			up: false,
			down: false
		}, {
			up: false,
			down: false
		}];

		window.addEventListener('keydown', (e) => {
			this.changeButtonState(e.keyCode, 'keydown');
		});

		window.addEventListener('keyup', (e) => {
			this.changeButtonState(e.keyCode, 'keyup');
		});
	}

	changeButtonState(keyCode, event) {
		if (!this.enabled)
			return;

		switch (keyCode) {
			case 38:
				this.pressedButtons[0].up = event == 'keydown';
				break;
			case 40:
				this.pressedButtons[0].down = event == 'keydown';
				break;
			case 87:
				this.pressedButtons[1].up = event == 'keydown';
				break;
			case 83:
				this.pressedButtons[1].down = event == 'keydown';
				break;
		}
	}

	getButtonStates() {
		return this.pressedButtons;
	}

	enable() {
		this.enabled = true;
	}

	disable() {
		this.enabled = false;
	}
}