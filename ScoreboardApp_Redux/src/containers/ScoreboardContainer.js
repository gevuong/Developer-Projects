// Libs
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPlayer, removePlayer, updatePlayerScore } from '../actions/player_actions';

// Components
import Scoreboard from '../components/Scoreboard';

const mapStateToProps = state => (
  {
    players: state,
  }
);

const mapDispatchToProps = dispatch => (
  {
  addPlayer: bindActionCreators(addPlayer, dispatch),
  removePlayer: bindActionCreators(removePlayer, dispatch),
  updatePlayerScore: bindActionCreators(updatePlayerScore, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);

// connect() takes two arguments, a function that converts state data to props data.

// connect() provides a way to subscribe to specific parts of the Redux store. In other words, connect() passes specific slices of store's state and specific action dispatches to React component as props. A component's props then serve as its API to the store.

// bindActionCreators(): Constructs a bound action creator that generates an action and is immediately dispatched to the Redux store. an action creator that, when invoked, will also be dispatched.

// bindActionCreators() packages action creators into ready-to-use methods, and eliminates the need to pass dispatch down to every child component. Provides a way for components to invoke an action and dispatch it all at once without having to add a dispatch prop.
