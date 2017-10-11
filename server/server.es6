console.log('Starting server…');

const io = require('socket.io')(3000);

const maxConnections = 2;
let currentConnections = 0;

io.on('connection', (socket) => {
	console.log('New connection!');

	// Deny new connections if we're already saturated
	if (currentConnections == maxConnections) {
		socket.disconnect(true);
		console.log('Connection denied, already saturated');
		return;
	}

	console.log(`Current connection count: ${ ++currentConnections }/${ maxConnections }`);

	if (currentConnections == maxConnections)
		io.emit('ready');

	socket.on('message', (message) => {
		console.log(message);
	});

	socket.on('disconnect', (reason) => {
		console.log('Socket disconnected for the following reason: ' + reason);
		currentConnections--;
	})
});

console.log('Server started!');