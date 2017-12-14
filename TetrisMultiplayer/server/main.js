const express = require('express');
const WebSocketServer = require('ws').Server;
const path = require('path');

const Session = require('./session');
const Client = require('./client');

// const server = new WebSocketServer({ port: 9000 });
const PORT = process.env.PORT || 9000;
const INDEX = path.join(__dirname, 'index.html');

// create an HTTP server to do two things: serve our client-side assets and provide a hook for the WebSocket server to monitor for upgrade requests.
const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`
  ));

// create websocket server. WebSocket server takes a HTTP server as an arg so that it can listen for 'upgrade' events
const wss = new WebSocketServer({ server });

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
        clients: clients.map(client => {
          return {
            id: client.id,
            state: client.state,
          }
        }),
      },
    });
  })
}

// handle connection by logging connections and disconnections.
wss.on('connection', conn => {
  console.log('connected to port 9000');
  const client = createClient(conn); // id arg is optional

  // message is received from client side
  conn.on("message", msg => {
    console.log("Message received (server-side): ", msg);
    const data = JSON.parse(msg);

    if (data.type === 'create-session') {
      const id = createId();
      const session = createSession(); // create new session instance
      client.state = data.state; // set initial state on client
      session.join(client);
      client.send({
        type: 'session-created',
        id: session.id,
      });
    } else if (data.type === 'join-session') {
      const session = getSession(data.id) || createSession(data.id);
      session.join(client);
      client.state = data.state;

      broadcastSession(session); // whenever we call broadcastSession(), we always have an updated copy of player state
    } else if (data.type === 'state-update') {
      const [prop, value] = data.state;
      client.state[data.fragment][prop] = value; // for each state output, we keep value on server as well
      client.broadcast(data); // send message to all peers
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
