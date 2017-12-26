## Frontend
* [ ] [Super Mario Bros](https://goo.gl/BnoLin) (vanilla JS)
  * [x] Create sprite of game screen (sky and ground tiles) background
  * [ ]


* [x] [Tetris, 2-player](https://goo.gl/voR27T) (vanilla JS)
  * [x] left-player keys: ASDW, right-player keys: Up, Down, Left, Right
  * [x] Collision detection (technical challenge)
  * [x] Rotate Tetrominoes (technical challenge)
  * [x] Remove row when entire row is filled
  * [x] Basic scoreboard
  * [x] Implement two player capability
  * [x] Implement multi-player capability using websockets (need to deploy)
  * [ ] Persist high score


* [x] [Scoreboard App](https://goo.gl/GjZeVb) (React.js with Redux)
  * [x] Increment/decrement score per player
  * [x] Add and remove player
  * [x] Stats on total player count and score
  * [x] Player details showing Score, Created At, Updated At
  * [x] Stopwatch with start, stop, and reset buttons
  * Challenge encountered: Designing data flow that is easy to understand and maintain, such as communicating events from grandchild to parent component via virtualDOM traversal.

![Scoreboard gif](images/scoreboard.gif)

* [x] [CourseDirectory App](https://goo.gl/RqTLNk) (React.js, React Router 4)
  * [x] Single page application
  * [x] Navigate routes programmatically via form submission
  * [x] Displays 404 Error route

![CourseDirectory gif](images/course_directory.gif)

* [x] [GIFSearch App](https://goo.gl/8e7Bqn) (React.js, fetchAPI, Axios)
  * [x] Renders 24 currently trending GIFs using Giphy API's **Trending GIFs Endpoint**
  * [x] Search feature using Giphy API's **Search Endpoint**
  * [x] Loading indicator and "no GIFS match your search" indicator

![Gif Search gif](images/giphysearch.gif)

* [x] [RSVP App](https://goo.gl/tWjW7c) (vanilla JS)
  * [x] Create, edit, and remove guest from RSVP list
  * [x] Filter guests who have responded
  * Learning goals: DOM traversal, DOM manipulation, event handling

![rsvp gif](images/rsvp.gif)


## Backend
* [ ] [URL Shortener] (Ruby on Rails)
  * [x] Create new users and shortened url using CLI
  * [x] Launches shortened url via Launchy gem
  * [x] Records number of url visits, unique visits, and unique visits within a recent time period
  * [ ] Establish functionality on browser (currently works in terminal)
