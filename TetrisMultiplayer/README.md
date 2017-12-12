Steps to run application:

- Run node server/main.js to start server.
- Copy full path to index.html, and paste onto browser to open application


10. When local player is playing, the moment another player is added. Nothing is happening. The added players need to get a message from the server to "join-session". We want to know if the added players are playing. To do this, create event library to listen and emit events when player is playing, such as updating player score, updating player position changes.

To test on browser, access a instances Set object using the following command: `[...tetrisManager.instances][0].player.score = 100` will update player score to 100.

10. a) Update drop(), invocations of updateScore(), reset(), and rotate() to incorporate this.events.emit() 'pos', 'score', 'matrix'.

10. b) When board is cleared or when an object merges, we need to send updates to board. Include events to listen to in Board class. `this.events.emit('matrix', this.matrix)` in clear(), merge(), and removeLine() of Board class.


11. Connect event listeners to a player when player connects/joins the server. Create a watchEvents() in 
