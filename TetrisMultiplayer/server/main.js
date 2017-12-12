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


function createClient(conn, id = createId()) {
  return new Client(conn, id);
}


function createSession(id = createId()) {
  if (sessions.has(id)) {
    throw new Error(`Session ${id} already exists`);
  }

  const session = new Session(id);
  console.log("Creating session (server): ", session);
  sessions.set(id, session); // add session key/value to Map object
  return session;
}


function getSession(id) {
  return sessions.get(id);
}

function broadcastSession(session) {
  const clients = [...session.clients];
  clients.forEach(client => {
    client.send({
      type: "session-broadcast",
      peers: {
        you: client.id,
        clients: clients.map(client => client.id),
      },
    });
  })
}


server.on('connection', conn => {
  console.log('connected to port 9000');
  const client = createClient(conn); // id arg is optional

  // message is received from client side
  conn.on("message", msg => {
    console.log("Message received (server-side): ", msg);
    const data = JSON.parse(msg);

    if (data.type === 'create-session') {
      const id = createId();
      const session = createSession(); // create new session instance
      session.join(client);
      client.send({
        type: 'session-created',
        id: session.id,
      });
    } else if (data.type === 'join-session') {
      const session = getSession(data.id) || createSession(data.id);
      session.join(client);

      broadcastSession(session);
    }

    // console.log('sessions: ', sessions);
  });

  conn.on('close', () => {
    const session = client.session;
    console.log(`connection to session: "${session.id}" closed`);
    if (session) {
      session.leave(client);
      if (session.clients.size === 0) { // means there are no more sessions/clients/rooms, delete whole session from sessions map
        sessions.delete(session.id);
      }
    }
    broadcastSession(session);
  });
});
