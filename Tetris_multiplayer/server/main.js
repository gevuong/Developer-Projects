const WebSocketServer = require('ws').Server;
const Session = require('./session');
const Client = require('./client');

const server = new WebSocketServer({ port: 9000 });
const sessions = new Map; // store session in Map object


function createId(length = 6, chars = 'abcdefghijklmnopqrstuvwxyz0123456789') {
  let id = "";
  while (length--) { // becomes falsey when length == 0
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

server.on('connection', conn => {
  console.log('connected to port 9000');
  const client = new Client(conn);

  conn.on("message", msg => {
    console.log("Message received: ", msg);
    const data = JSON.parse(msg);

    if (data.type === 'create-session') {
      const id = createId();
      const session = new Session(id); // create new session instance
      session.join(client);
      sessions.set(session.id, session); // add session key/value to Map object
      client.send({
        type: 'session-created',
        id: session.id
      });
    }
  });

  conn.on('close', () => {
    console.log('connection closed');
    const session = client.session;
    if (session) {
      session.leave(client);
      if (session.clients.size === 0) { // means there are no more sessions/clients/rooms, delete whole session from sessions map
        sessions.delete(session.id);
      }
    }
  })
})
