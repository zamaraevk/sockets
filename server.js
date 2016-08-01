'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('location', function(data) {
      console.log("Incoming location:", data)
      //sending dummy data for group update

     // socket.emit('groupUpdate', {'group':[{'latitude': data.coordinates.latitude, 'longitude':  data.coordinates.longitude, 'title': 'Konst' }, {'latitude':data.coordinates.latitude + 0.0008, 'longitude': data.coordinates.longitude, 'title': 'Bo' }]});
    });
    socket.on('error', function(err) {
      console.log("Error", err);
    });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);


// var express = require('express')
// app = require('./api');
// var http = require('http')
// var server = require('http').Server(app);
// var port = process.env.PORT || 3001;
// app.use(express.static('../'));
// //var api = require("./api");

// // var bodyParser = require('body-parser');

// server.listen(port, ()=>
//   console.log('server listening on port: ' + port)
//   );
// // use socket.io
// var io = require('socket.io').listen(server);


// //turn off debug
// io.set('log level', 1);

// // define interactions with client
// io.sockets.on('connection', function(socket){

//      socket.on('location', function(data) {
//       console.log("Incoming location:", data)
//       //sending dummy data for group update

//       socket.emit('groupUpdate', {'group':[{'latitude': data.coordinates.latitude, 'longitude':  data.coordinates.longitude, 'title': 'Konst' }, {'latitude':data.coordinates.latitude + 0.0008, 'longitude': data.coordinates.longitude, 'title': 'Bo' }]});
//     });
//     socket.on('error', function(err) {
//       console.log("Error", err);
//     });
// });

// module.exports = app;
