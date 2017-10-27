import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Control Component is when an input form element (i.e <input>, <textarea>, <select>), maintain their own state and update based on user input. The input form element's value is controlled by React. Every state mutation (i.e this.state.name) will have an associated handler fcn (i.e onNameChange()). React state is the "single source of truth" because for example, the displayed value in form element will always be "this.state.value".

// Logical component, manages its own state, and may use lifecycle events. It is not possible to use var, let, or const with export default 
export default class AddPlayerForm extends Component {
  constructor(props) {
    super(props);

    AddPlayerForm.propTypes = {
      onAdd: PropTypes.func.isRequired,
    }
    this.state = { name: '' }; // The state called "name" is considered a local component state

    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  // event.target represents <input> element generated in form. Since onNameChange() runs on every keystroke to update React state, the displayed value will update as user types.
  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  // when form submits, page refreshes. Use preventDefault()
  onSubmit(e) {
    e.preventDefault();
    if (this.state.name.split(' ').join('').length > 0) {
      this.props.onAdd(this.state.name);
      this.setState({ name: '' });
    }
  }

  render() {
    return (
      <div className="add-player-form">
        <form onSubmit={ this.onSubmit } >
          <input type="text" placeholder="input name" value={ this.state.name } onChange={ this.onNameChange }></input>
          <input type="submit" value="Add Player" ></input>
        </form>
      </div>
    )
  }
}

// export default AddPlayerForm;
