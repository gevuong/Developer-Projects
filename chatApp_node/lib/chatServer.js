// setup socket.io in conjunction with Express
// const app = require('express')(); // need () to invoke express app?
// const server = require('http').createServer(app); // pass express app (a req handler fcn to http or httpServer instance)
const io = require('socket.io'); // need to pass server to socket.io, and not the express app function
// const fs = require('fs');
let chat;
const chatServer = {
  listen(server) {
    chat = io(server);

    chat.on('connection', () => {
      console.log('connected');
    })
  }
}
// // call .listen on the server, not the app
// server.listen(80);

module.exports = chatServer;
