// Libs
import { createStore } from 'redux';

// Reducers
import PlayerReducer from '../reducers/player_reducer';

// create Redux store that holds complete state tree of app. The only way to change state inside store is to dispatch an action on it. A store is just an object, not a class.
const store = createStore(
  PlayerReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
