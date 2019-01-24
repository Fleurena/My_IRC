var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var channels = ['general', 'hey'];
var message = [];
console.log(message);

io.on('connection', function(socket){
	socket.user = null;
	socket.room = channels[0];
	socket.join(socket.room);
	console.log('vous avez rejoint #'+ socket.room);
	socket.emit('rooms', channels);
	socket.emit('messages', message);
	console.log(channels);
	
	socket.on('login', function(user){
		socket.user = user;
		io.emit('logins', user);
		console.log('login :', user);
	});
	socket.on('message', function(msg){
		message.push(msg);
		io.emit('messages', message);
		console.log('messages : ' + message);
	});
	socket.on('room', function(channel){
		channels.push(channel);
		io.emit('rooms', channels);
		console.log(channels);
		console.log(socket.room);
		// io.to(channels).emit('channels', message);
		channels.forEach(element => {
			socket.join(element);
			socket.room = element;
			});
		// console.log('channel:' + room);
	});
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnect');
	});
});

http.listen(3001, function(){
  console.log('http://127.0.0.1:3001/');
})