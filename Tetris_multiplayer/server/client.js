class Client {
  constructor(conn) {
    this.conn = conn;
    this.session = null; // session is where the client will live in
  }

  send(data) {
    const msg = JSON.stringify(data);
    console.log(`Sending message (server-side): ${msg}`);
    this.conn.send(msg, err => {
      if (err) {
        console.error("Message failed: ", msg, err);
      }
    });
  }
}

module.exports = Client;
