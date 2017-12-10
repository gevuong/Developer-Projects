const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const chatServer = require('./lib/chatServer');

const PORT = 3000;

chatServer.listen(http);

// use express' built-in middleware function
app.use(express.static('public'));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
  // res.send("Hello World");
})

// test if app.listen doesn't work
http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})
