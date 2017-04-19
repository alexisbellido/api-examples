import React from 'react';

// This is a controlled component
class NameForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: 'green'
        };

      // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit (event) {
        console.log('controlled form submitted: ' + this.state.value);
        event.preventDefault();
    }

    render () {
        return (
          <form onSubmit={this.handleSubmit}>
              <h2>Controlled Form</h2>
              <label>
                <input name="name" type="text" className="text"
                   />
              </label>
              <select name="colors" value={this.state.value} onChange={this.handleChange}>
                <option value="red">red</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
              </select>
              <input type="submit" value="Submit"/>
          </form>
        );
    }
}

export default NameForm;
