import { connect } from 'react-redux';

import { requestAllCampgrounds } from '../actions/thing_actions';
import ThingsIndex from './things_index';

const mapStateToProps = ({ campgrounds }) => ({
    campgrounds,
});

// function that returns an object containing functions that can be called to dispatch acttions to the store.
const mapDispatchToProps = dispatch => ({
    requestAllCampgrounds: () => dispatch(requestAllCampgrounds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThingsIndex);
// A container component is just a React component that uses store.subscribe() to read part of the state tree and supply props for presentational components to render. connect() basically connects a React component to slices of the state in the Redux store, and action dispatches to view components.
