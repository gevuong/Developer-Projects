import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ThingsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            loading: true,
        };

        ThingsIndex.propTypes = {
            requestFetchThings: PropTypes.func.isRequired,
            // things: PropTypes.object.isRequired,
        }

        this.handleChange = this.handleChange.bind(this);
        this.selectThing = this.selectThing.bind(this);
    }

    componentDidMount() {
        this.props.requestFetchThings().then(
            this.setState({
                loading: false,
            })
        );
    }

    handleChange(event) {
        const searchQuery = event.target.value;
        this.setState({
            searchQuery: searchQuery,
        });
        console.log(this.state);
    }

    selectThing(event) {
        this.setState({
            searchQuery: event.target.value,
        });
    }

    findMatches() {

    }

    render() {
        const { things } = this.props;
        console.log("things: ", things);
        console.log("props: ", this.props);
        const allIDs = Object.keys(things);
        console.log("allIDs: ", allIDs);
        // pass sort a compareFunction to sort lowercased and uppercased characters in string
        // things.sort((a, b) => {
        //     a = a.toLowerCase();
        //     b = b.toLowerCase();
        //     if (a === b) return 0;
        //     if (a > b) return 1; // meaning, b comes before a. convert character to ASCII and then makes comparison. So if ("z" > "d"), which is true, return 1, meaning "a" comes before "z".
        //     return -1; // meaning a comes before b.
        // });
        if (this.state.loading) {
            return (
                <h3>Loading...</h3>
            )
        } else {
            return (
                <div className="main-content">
                    <h3>ThingsIndexComponent</h3>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={ this.handleChange }
                        value={ this.state.searchQuery }
                    />
                    <div>
                        <ul>
                            <ReactCSSTransitionGroup
                                transitionName="auto"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}
                                >
                                <li>Render list of things here</li>
                                { allIDs.map((id, idx) => (
                                    <li
                                        key={idx}
                                        onClick={ this.selectThing }
                                    >
                                        { things[id].firstName }
                                    </li>
                                ))
                                }
                            </ReactCSSTransitionGroup>
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

export default ThingsIndex;
