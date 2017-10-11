import IO from 'socket.io-client';

export default class Socket {
	constructor(address) {
		this.socket = IO(address, {
			path: '/server'
		});
	}

	registerReady(callback) {
		this.socket.on('ready', callback);
	}

	registerStart(callback) {
		this.socket.on('start', callback);
	}
}