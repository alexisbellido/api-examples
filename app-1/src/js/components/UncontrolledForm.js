import React from 'react';

// This is an uncontrolled component
class UncontrolledForm extends React.Component {
    constructor (props) {
        super(props);
      // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.focus = this.focus.bind(this);
    }

    handleSubmit (event) {
        console.log(`uncontrolled form, name: ${this.name.value} phone: ${this.phone.value}`);
        event.preventDefault();
    }

    focus () {
        // uses DOM API's focus method
        this.textInput.focus();
    }

    render () {
        // ref attribute takes a callback function, and the callback will be executed immediately after the component is mounted or unmounted
        // When the ref attribute is used on an HTML element, the ref callback receives the underlying DOM element as its argument
        return (
          <form onSubmit={this.handleSubmit}>
              <h2>Uncontrolled Form</h2>
              <label>Name:
                <input name="name" type="text" className="text"
                  ref={(input) => (this.name = input)} />
              </label>
              <label>Phone:
                <input name="phone" type="text" className="text" defaultValue="123-456-9999"
                  ref={(input) => (this.phone = input)} />
              </label>
              <p>
                <input type="text" ref={(input) => (this.textInput = input)} />
                <button onClick={this.focus}>Set focus</button>
              </p>
              <input type="submit" value="Submit"/>
          </form>
        );
    }
}

export default UncontrolledForm;
