Steps to run application:

- Run node server/main.js to start server.
- Copy full path to index.html, and paste onto browser to open application


10. When local player is playing, the moment another player is added. Nothing is happening. The added players need to get a message from the server to "join-session". We want to know if the added players are playing. To do this, create event library to listen and emit events when player is playing, such as updating player score, updating player position changes.

To test on browser, to access a instances Set object: `[...tetrisManager.instances][0].player.score = 100` will update player score to 100.

11.
