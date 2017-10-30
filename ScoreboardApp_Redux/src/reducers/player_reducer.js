// import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER } from '../actions/player_actions';
import * as PlayerActions from '../actions/player_actions';

const initialPlayers = {
  players: [
    {
      name: 'Pablo Picasso',
      score: 91,
      created: 'Tuesday, Oct 25, 1881, 12:53 PM',
      updated: 'Sunday, Apr 08, 1973, 1:09 AM',
    },
    {
      name: 'Georgia O\' Keefe',
      score: 98,
      created: 'Tuesday, Nov 15, 1887, 7:01 AM',
      updated: 'Thursday, Mar 06, 1986, 3:12 PM',
    },
    {
      name: 'Claude Monet',
      score: 86,
      created: 'Saturday, Nov 14, 1840, 9:16 AM',
      updated: 'Sunday, Dec 05, 1926, 6:28 PM',
    }
  ],
  selectedPlayerIndex: -1
};

const playerReducer = (state = initialPlayers, action) => {
  Object.freeze(state);

  let now = new Date();
  let nowHours = now.getHours();
  let nowMinutes = now.getMinutes();

  let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let hours;
  nowHours === 0 || nowHours === 12 ? hours = 12 : hours = nowHours % 12;
  let ampm;
  nowHours >= 12 ? ampm = 'PM' : ampm = 'AM';
  let minutes;
  nowMinutes < 10 ? minutes = '0' + nowMinutes : minutes = nowMinutes;

  let currentDateTime = `${weekdays[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}, ${hours}:${minutes} ${ampm}`;

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
        ...state.players.slice(0, action.index),
        ...state.players.slice(action.index + 1)
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
            created: player.created,
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
