import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };

        AutoComplete.propTypes = {
            names: PropTypes.array.isRequired,
        }

        this.handleChange = this.handleChange.bind(this);
        this.selectName = this.selectName.bind(this);
        this.findMatches = this.findMatches.bind(this);
    }

    handleChange(event) {
        this.setState({
            name: event.target.value,
        })

        console.log(this.state);
    }

    findMatches(names) {
        let matches = [];
        let inputName = this.state.name;

        if (inputName.length === 0) {
            return names;
        }

        names.forEach(name => {
            // Uncomment below if dictionary-type search is desired
            // let subName = name.slice(0, inputName.length);
            // if (subName.toLowerCase() === inputName.toLowerCase()) {

            if (name.includes(inputName)) {
                matches.push(name);
            }
        })

        if (matches.length === 0) {
            return ["There are no matches"];
        }

        return matches;
    }

    selectName(event) {
        // e.currentTarget refers to element to which event handler is attached to. e.target returns element on which event occurred.
        this.setState({
            name: event.target.textContent,
        });
    }

    render() {
        const { names } = this.props;
        names.sort();
        let matchedResults = this.findMatches(names);

        return (
            <div className="main-content">
                <h3>Autocomplete</h3>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={ this.handleChange }
                    value= { this.state.name }
                />
                <div>
                    <ul>
                        <ReactCSSTransitionGroup
                            transitionName="auto"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                        >
                            { matchedResults.map((name, idx) => (
                                <li
                                    key={idx}
                                    onClick={ this.selectName }
                                >
                                { name }
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

export default AutoComplete;
