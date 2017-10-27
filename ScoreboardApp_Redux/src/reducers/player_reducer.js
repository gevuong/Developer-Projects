// import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER } from '../actions/player_actions';
import * as PlayerActionTypes from '../actions/player_actions';

const initialState = [
  {
    name: 'Mohandas Ghandi',
    score: 15,
  },
  {
    name: 'Pablo Picasso',
    score: 23,
  },
  {
    name: 'Sigmund Freud',
    score: 56,
  },
  {
    name: 'Maria Montessori',
    score: 37,
  }
];

// reducer should be written as a pure function, and not mutate or alter current state! In other words, the state for reducer must be immutable. Immutability is not enforced by Redux, so it's up to developer to make sure reducer is implemented as pure functions. A reducer takes two args, current state and action taken, and produces the next state.
const playerReducer = (state = initialState, action) => {
  switch(action.type){
    case PlayerActionTypes.ADD_PLAYER:
    // spread operator will generate new object/array without mutating or altering original source, which is key because object should be immutable or unalterable.
    return [...state,
      {
        name: action.name,
        score: 0,
      }
    ];

    case PlayerActionTypes.REMOVE_PLAYER:
    return [
      ...state.slice(0, action.index),
      ...state.slice(action.index + 1)
    ];

    case PlayerActionTypes.UPDATE_PLAYER_SCORE:
      return state.map((player, index) => {
        if (index === action.index) {
          return {
            ...player,
            score: player.score + action.score
          };
        };
        return player;
      });

    default:
      return state;
  }
}

export default playerReducer;


// The role of a reducer is to interpret actions that occur within app and produce a new state for specific data. In Redux, an action returns a new state via a reducer.
