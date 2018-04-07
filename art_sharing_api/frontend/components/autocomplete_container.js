import { connect } from 'react-redux';

import { requestFetchThings, requestSearchThings } from '../actions/thing_actions';
import AutoComplete from './autocomplete';

const mapStateToProps = ({ things }) => ({
    names: things,
});

// function that returns an object containing functions that can be called to dispatch acttions to the store.
const mapDispatchToProps = dispatch => ({
    requestFetchThings: () => dispatch(requestFetchThings()),
    requestSearchThings: query => dispatch(requestSearchThings(query)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AutoComplete);
// A container component is just a React component that uses store.subscribe() to read part of the state tree and supply props for presentational components to render. connect() basically connects a React component to slices of the state in the Redux store, and action dispatches to view components.
