const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.static(path.resolve(__dirname, 'public')));

let users = 0;

io.on('connection', socket => {
	socket.broadcast.emit('userCountChange',++users);
	console.log(users);
	// send the initial message
	socket.emit('userCountChange', users);

	socket.on('disconnect', () => {
		socket.broadcast.emit('userCountChange',--users);
		console.log(users);
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
