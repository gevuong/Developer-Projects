import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        if (this.state.name.length === 0) {
            return names;
        }

        names.forEach(name => {
            if (name.includes(this.state.name)) {
                matches.push(name);
            }
        })

        if (matches.length === 0) {
            return ["There are no matches"];
        }

        return matches
    }

    selectName(event) {
        // currentTarget refers to element to which event handler is attached to. target returns element on which event occurred.
        this.setState({
            name: event.target.textContent,
        });
        console.log("selectName state: ", this.state);
    }

    render() {
        const { names } = this.props;
        names.sort();

        let matchedResults = this.findMatches(names);
        console.log("matchedResults: ", matchedResults);
        return (
            <div className="main-content">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={ this.handleChange }
                    value= { this.state.name }
                >
                </input>
                <div>
                    <ul>
                        { matchedResults.map((name, idx) => (
                            <li
                                key={idx}
                                onClick={ this.selectName }
                            >
                            { name }
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default AutoComplete;
