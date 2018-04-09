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
        // this.props.requestFetchThings().then(
        //     this.setState({
        //         loading: false,
        //     })
        // );
    }

    handleChange(event) {
        this.setState({
            searchQuery: event.target.value,
        });
        console.log(this.state);
    }

    selectThing(event) {
        this.setState({
            searchQuery: event.target.textContent,
        });
    }

    findMatches() {
        const thingsArr = [];
        const { things } = this.props;
        const allIDs = Object.keys(things);

        // return array of things
        allIDs.forEach(id => (
            thingsArr.push(things[id].firstName)
        ))

        if (this.state.searchQuery.length === 0) {
            return thingsArr;
        }

        const matches = thingsArr.filter(
            thing => thing.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        )

        // pass sort a compareFunction to sort lowercased and uppercased characters in string
        matches.sort((a, b) => {
            a = a.toLowerCase();
            b = b.toLowerCase();
            if (a === b) return 0;
            if (a > b) return 1; // meaning, b comes before a. convert character to ASCII and then makes comparison. So if ("z" > "d"), which is true, return 1, meaning "a" comes before "z".
            return -1; // meaning a comes before b.
        });


        if (matches.length === 0) {
            return ["There are no matches"];
        }

        return matches;
    }

    render() {
        const { things } = this.props;
        // console.log("things: ", things);
        console.log("props: ", this.props);
        console.log("state: ", this.state);

        const searchResults = this.findMatches();
        console.log("searchResults: ", searchResults);
        // if (this.state.loading) {
        //     console.log("enter loading");
        //     return (
        //         <div>
        //             <h1>Loading...</h1>
        //         </div>
        //     )
        // } else {
            return (
                <div>
                    <header>
                        <h1>Stack Overflow</h1>
                        <p>Find the answer to your questions. Begin search here.</p>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={ this.handleChange }
                            value={ this.state.searchQuery }
                        />
                    </header>

                    <div className="main">
                        <ul>
                            <ReactCSSTransitionGroup
                                transitionName="auto"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}
                                >
                                { searchResults.map((thing, idx) => (
                                    <li
                                        key={idx}
                                        onClick={ this.selectThing }
                                    >
                                        { thing }
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

export default ThingsIndex;
