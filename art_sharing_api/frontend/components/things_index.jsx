import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { RingLoader } from 'react-spinners';

class ThingsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            loading: true,
        };

        ThingsIndex.propTypes = {
            campgrounds: PropTypes.shape({
                name: PropTypes.string,
                description: PropTypes.string,
                image_url: PropTypes.string,
            }),
            requestAllCampgrounds: PropTypes.func.isRequired,
        }

        this.handleChange = this.handleChange.bind(this);
        this.selectCampground = this.selectCampground.bind(this);
    }

    componentDidMount() {
        this.props.requestAllCampgrounds().then(() =>
            this.setState({
                loading: false,
            })
        );
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

        // totalPages = searchResults / 5
        return (
            <div>
                <header>
                    <h2>National Park Services</h2>
                    <p>Explore. Find your campground. Begin your search today.</p>
                    <form>
                        <input
                            type="text"
                            name="search-query"
                            placeholder="Discover your next campground..."
                            onChange={ this.handleChange }
                            value={ this.state.searchQuery }
                        />
                        <button
                            type="submit"
                            name="search"
                            value="submit"
                        >Search
                        </button>
                    </form>
                </header>
                <RingLoader
                    className="sweet-loading"
                    color={'#000'}
                    loading={this.state.loading}
                />
            <h1>fetching data...</h1>
                <ul>
                    <ReactCSSTransitionGroup
                        transitionName="auto"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        >
                        { searchResults.map((campground, idx) => (
                            <li
                                key={idx}
                                onClick={ this.selectCampground }
                                >
                                <div className="campground-container">
                                    <div>
                                        <img className="campground-img" src="http://res.cloudinary.com/dtluc0y85/image/upload/v1523306878/header_humzpt.jpg" />
                                    </div>
                                    <div className="campground-info">
                                        <p>{ campground }</p>
                                    </div>

                                </div>
                            </li>
                        ))
                        }
                    </ReactCSSTransitionGroup>
                </ul>
            </div>
            )
    }
}

export default ThingsIndex;
