const WebSocketServer = require('ws').Server;

const server = new WebSocketServer({ port: 9000 });

const sessions = new Map; // store session in Map object

class Session {
  constructor(id) {
    this.id = id;
  }
}

server.on('connection', conn => {
  console.log('connected to port 9000');

  conn.on("message", msg => {
    console.log("Message received: ", msg);

    if (msg === 'create-session') {
      const session = new Session('foobar'); // create new session instance
      sessions.set(session.id, session); // add session key/value to Map object
    }
    console.log(sessions);
  });

  conn.on('close', () => {
    console.log('connection closed');
  })
})
