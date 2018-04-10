import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { RingLoader } from 'react-spinners';

import PaginationBar from './pagination_bar';

class ThingsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            loading: true,
            rowsPerPage: 6,
            currentPage: 1,
        };

        ThingsIndex.propTypes = {
            campgrounds: PropTypes.shape({
                name: PropTypes.string,
                description: PropTypes.string,
                image_url: PropTypes.string,
            }),
            requestAllCampgrounds: PropTypes.func.isRequired,
        }

        this.onChangePage = this.onChangePage.bind(this);
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

    // onChangePage needs to retrieve currentPage from PaginationBar Component
    onChangePage(currentPage) {
      this.setState((prevState) => { // setState() can run asynchronously and has access to prevState
        return {
          currentPage: currentPage,
        }
      })
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
        const { rowsPerPage, currentPage } = this.state;

        console.log("props: ", this.props);
        console.log("state: ", this.state);

        const searchResults = this.findMatches();
        console.log("searchResults: ", searchResults);

        // need prevPage in order to determine initial index of slice(). if currentPage is 1 (default), then prevPage is 0, which equates to an idx of 0
        const prevPage = currentPage - 1;
        const firstIndex = prevPage * rowsPerPage

        // when setState executes, render is invoked with updated currentPage value. round up due to zero index to calculate totalPages.
        const lastIndex = currentPage * rowsPerPage;
        const totalPages = Math.ceil(searchResults.length / rowsPerPage);

        let startPage, endPage;

        // calculate startPage and endPage based on totalPages. The following code modifies number of pages to render when traversing PaginationBar.
        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else { //
            if (currentPage <= 2) {
                startPage = 1;
                endPage = currentPage + 1;
            }
            else if (currentPage + 1 >= totalPages) {
            // consider currentPage is close to exceeding totalPages
            startPage = totalPages - 1;
            endPage = totalPages;
            }
            else {
            // otherwise, currentPage will always be between startPage and endPage
            startPage = currentPage - 1;
            endPage = currentPage + 1;
            }
        }

        const slicedData = searchResults.slice(startPage, endPage);

        return (
            <div>
                <header>
                    <h2>National Park Services</h2>
                     <div className="text-and-form">
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
                                 >
                                 <div>
                                     <span><i className="fas fa-search"></i></span>
                                     <span>Search</span>
                                 </div>
                             </button>
                         </form>
                     </div>
                </header>
                if (this.state.loading)
                    return {
                        <div>
                        <RingLoader
                            className="sweet-loading"
                            color={'#000'}
                            loading={this.state.loading}
                            value="getting coffee, one sec..."
                            name="getting coffee, one sec..."
                            placeholder="getting coffee, one sec..."
                        >getting coffee, one sec...
                        </RingLoader>

                        </div>
                    }

                <ul>
                    <ReactCSSTransitionGroup
                        transitionName="auto"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        >
                        { slicedData.map((campground, idx) => (
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

                {/* Don't render PaginationBar if Data <= rowsPerPage */}
                <div className="pagination-container">
                    { searchResults.length > rowsPerPage ?
                        <PaginationBar
                            data={ searchResults }
                            currentPage={ currentPage }
                            rowsPerPage={ rowsPerPage }
                            totalPages={ totalPages }
                            startPage={ startPage }
                            endPage={ endPage }
                            onChangePage={ this.onChangePage }
                        />
                        :
                        " "
                    }
                </div>
            </div>
        )
    }
}

export default ThingsIndex;
