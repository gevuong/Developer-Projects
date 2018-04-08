import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ThingsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            searchQuery: "",
            queryPending: "",
        };

        // ThingsIndex.propTypes = {
        //     things: PropTypes.array.isRequired,
        // }
    }

    componentDidMount() {
        this.props.requestFetchThings();
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

        return (
            <div className="main-content">
                <h3>ThingsIndexComponent</h3>
                <input
                    type="text"
                    placeholder="Search..."
                />
                <div>
                    <ul>
                        <ReactCSSTransitionGroup
                            transitionName="auto"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                        >
                            <li>Render list of things here</li>
                            { allIDs.map(id => (
                                <li>{ things[id].firstName }</li>
                            ))
                            }
                        </ReactCSSTransitionGroup>
                    </ul>
                </div>

            </div>
        )
    }
}

export default ThingsIndex;
