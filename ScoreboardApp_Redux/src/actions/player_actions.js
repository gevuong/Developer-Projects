// action types:
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const UPDATE_PLAYER_SCORE = 'UPDATE_PLAYER_SCORE';

// sync action creator used to generate an action that gets dispatched in order to change state
export const addPlayer = name => {
  return {
    type: ADD_PLAYER,
    name // <-- short for name: name

  }
};

export const removePlayer = index => {
  return {
    type: REMOVE_PLAYER,
    index // <-- short for index: index
  }
};

export const updatePlayerScore = (index, score) => {
  return {
    type: UPDATE_PLAYER_SCORE, // type identifies the action
    index, // metadata used to determine how app state will be affected
    score
  }
}

// export const addPlyaer =
