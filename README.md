## Frontend
* [ ] [Super Mario Bros](https://goo.gl/BnoLin) (vanilla JS)
  * [x] Create sprite of game screen (sky and ground tiles) background
  * [ ]
* [x] [Tetris](https://goo.gl/uQ3zDN) (vanilla JS)
  * [x] Collision detection (technical challenge)
  * [x] Rotate Tetrominoes (technical challenge)
  * [x] Basic scoreboard
  * [ ] Implement two player capability
  * [ ] Implement multi-player capability (websockets)
  * [ ] Persist high score
  * [ ] Add levels and music/effects
* [x] [Scoreboard App](https://goo.gl/GjZeVb) (React.js with Redux)
  * [x] Increment/decrement score per player
  * [x] Add and remove player
  * [x] Stats on total player count and score
  * [x] Player details showing Score, Created At, Updated At
  * [x] Stopwatch with start, stop, and reset buttons
  * [ ] Persist state with localStorage
  * Challenge encountered: Designing data flow that is easy to understand and maintain, such as communicating events from grandchild to parent component via virtualDOM traversal.
* [x] [CourseDirectory App](https://goo.gl/RqTLNk) (React.js, React Router 4)
  * [x] Single page application
  * [x] Navigate routes programmatically via form submission
  * [x] Displays 404 Error route
* [x] [GIFSearch App](https://goo.gl/8e7Bqn) (React.js, fetchAPI, Axios)
  * [x] Renders 24 currently trending GIFs using Giphy API's **Trending GIFs Endpoint**
  * [x] Search feature using Giphy API's **Search Endpoint**
  * [x] Loading indicator and "no GIFS match your search" indicator
  * [ ] Infinite scroll
* [x] [RSVP App](https://goo.gl/tWjW7c) (vanilla JS)
  * [x] Create, edit, and remove guest from RSVP list
  * [x] Filter guests who have responded
  * [ ] Persist state with localStorage
  * Learning goals: DOM traversal, DOM manipulation, event handling

## Backend
* [ ] [URL Shortener] (Ruby on Rails)
  * [x] Create new users and shortened url using CLI
  * [x] Launches shortened url via Launchy gem
  * [x] Records number of url visits, unique visits, and unique visits within a recent time period
  * [ ] Establish functionality on browser (currently works in terminal)
