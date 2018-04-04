import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "" }

        AutoComplete.propTypes = {
            names: PropTypes.array.isRequired,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            name: event.target.value,
        })
        console.log(this.state);
    }

    render() {
        const { names } = this.props;
        console.log(names);
        return (
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={ this.handleChange }
                    value= { this.state.name }
                >
                </input>
                <div>
                    <ul>
                        { names.map((name, idx) => (
                            <li key={idx}>{ name }</li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default AutoComplete;
