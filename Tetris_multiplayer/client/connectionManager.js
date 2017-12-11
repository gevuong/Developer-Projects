class ConnectionManager {
  constructor() {
    this.conn = null;
  }

  connect(address) {
    this.conn = new WebSocket(address);
    // addEventListener gets called once connection is established:
    this.conn.addEventListener('open', () => {
      console.log("connection established from client-side");

      // this.conn.send('create-session'); // send request from client-side to create a room/session in server

      this.send({
        type: 'create-session',
      });
      
    });

    this.conn.addEventListener('message', e => {
      console.log('Message received (client-side): ', e.data);
    })
  }

  send(data) {
    const msg = JSON.stringify(data);
    console.log(`Sending message: ${msg}`);
    this.conn.send(msg);
  }
}
