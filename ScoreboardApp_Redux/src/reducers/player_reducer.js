// import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER } from '../actions/player_actions';
import * as PlayerActions from '../actions/player_actions';

const initialPlayers = {
  players: [
    {
      name: 'Pablo Picasso',
      score: 23,
      created: 'Tuesday, Oct 25, 1881',
      updated: 'Sunday, Apr 08, 1973',
    },
    {
      name: 'Sigmund Freud',
      score: 56,
      created: 'Tuesday, May 06, 1856',
      updated: 'Saturday, Sep 23, 1939',
    },
    {
      name: 'Maria Montessori',
      score: 37,
      created: 'Wednesday, Aug 31, 1870',
      updated: 'Tuesday, May 06, 1952',
    }
  ],
  selectedPlayerIndex: -1
};

const playerReducer = (state = initialPlayers, action) => {
  Object.freeze(state);

  let now = new Date();
  let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let currentDateTime = `${weekdays[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  switch(action.type){

    // ADD_PLAYER case takes all existing items in state and changes just the players array of objects.
    case PlayerActions.ADD_PLAYER: {
      const addPlayerList = [...state.players,
        {
          name: action.name,
          score: 0,
          created: currentDateTime,
          updated: '',
        }
      ];
      return Object.assign({}, state, { players: addPlayerList })
      // ES6 syntax using spread operator:
      // return {
      //   ...state,
      //   players: addPlayerList
      // };
    };

    // REMOVE_PLAYER case takes all existing items in state and changes just the players array of objects.
    case PlayerActions.REMOVE_PLAYER: {
      const removePlayerList = [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
      return Object.assign({}, state, { players: removePlayerList })
      // ES6 syntax using spread operator:
      // return {
      //   ...state,
      //   players: removePlayerList
      // };
    }

    // UPDATE_PLAYER_SCORE case takes all existing items in state and changes just the players array of objects.
    case PlayerActions.UPDATE_PLAYER_SCORE: {
      const updatePlayerList = state.players.map((player, index) => {
        if (index === action.index) {
          return {
            name: player.name,
            score: player.score + action.score,
            updated: currentDateTime,
          }
        };
        return player;
      });
      return Object.assign({}, state, { players: updatePlayerList })
      // ES6 syntax using spread operator:
      // return {
      //   ...state,
      //   players: updatePlayerList
      // };
    }

    // SELECT_PLAYER case takes all existing items in state and changes just the selectedPlayerIndex.
    case PlayerActions.SELECT_PLAYER:
      return Object.assign({}, state, { selectedPlayerIndex: action.index })
      // ES6 syntax using spread operator:
      // return {
      //   ...state,
      //   selectedPlayerIndex: action.index
      // };

    default:
      return state;
  }
}

export default playerReducer;

// spread operator will generate new object/array without mutating or altering original source, which is key because object should be immutable or unalterable.

// reducer should be written as a pure function, and not mutate or alter current state! In other words, the state for reducer must be immutable. Immutability is not enforced by Redux, so it's up to developer to make sure reducer is implemented as pure functions. A reducer takes two args, current state and action taken, and produces the next state.

// The role of a reducer is to interpret actions that occur within app and produce a new state for specific data. In Redux, an action returns a new state via a reducer.

// Object.freeze prevents new properties from being added to an object, and also prevents properties currently on an object from being altered or deleted. Essentially, it renders an object immutable, which is exactly what we want.