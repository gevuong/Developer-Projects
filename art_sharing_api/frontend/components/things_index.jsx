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
            requestAllCampgrounds: PropTypes.func.isRequired,
            // campgrounds: PropTypes.object.isRequired,
        }

        this.handleChange = this.handleChange.bind(this);
        this.selectCampground = this.selectCampground.bind(this);
    }

    componentDidMount() {
        // this.props.requestAllCampgrounds().then(
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

    selectCampground(event) {
        this.setState({
            searchQuery: event.target.textContent,
        });
    }

    findMatches() {
        const campgroundsArr = [];
        const { campgrounds } = this.props;
        const allIDs = Object.keys(campgrounds);

        // return array of campgrounds
        allIDs.forEach(id => (
            campgroundsArr.push(campgrounds[id].name)
        ))

        if (this.state.searchQuery.length === 0) {
            return campgroundsArr;
        }

        const matches = campgroundsArr.filter(
            campground => campground.toLowerCase().includes(this.state.searchQuery.toLowerCase())
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
        const { campgrounds } = this.props;
        // console.log("campgrounds: ", campgrounds);
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
                        <h2>National Park Services</h2>
                        <p>Explore. Find your campground. Begin your search today.</p>
                        <input
                            type="text"
                            placeholder="Discover your next campground..."
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
                                        onClick={ this.selectCampground }
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
