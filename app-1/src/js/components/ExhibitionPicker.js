import React from 'react';
import axios from 'axios';

class ExhibitionPicker extends React.Component {
  // Class components should always call the base constructor with props.
  constructor (props) {
    super(props);
    // this.handleProductUpvote = this.handleProductUpvote.bind(this);
    this.state = {
      exhibitions: []
    };
  }

  componentDidMount () {
    const token = 'cdc39c5b5ef27f52b9131b54cb700b5a';
    // const url = `https://api.collection.cooperhewitt.org/rest/?method=api.test.echo&access_token=${token}`;

    // exhibitions list from API
    // const url = `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getList&page=1&per_page=5&access_token=${token}`;
    // exhibitions list from local file
    const url = `http://localhost:8888/src/js/exhibitions.json`;

    // one collection object
    // const url = `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&exhibition_id=69117611&page=1&per_page=5&access_token=${token}`;
    axios.get(url)
      .then(function (response) {
        let exhibitions = response.data;
        console.log(exhibitions);
      })
      .catch(function (error) {
        console.log(error);
      });
    // this.setState({ exhitions: exhitions });
  }

  // showExhibition (event) {
  //   event.preventDefault();
  //   // const storeId = this.storeInput.value;
  //   // console.log(`Going to ${storeId}`);
  //   console.log('Show exhibit');
  //   // this works because I exposed router using ExhibitPicker.contextTypes
  // }

  handleChange (event) {
    // this.setState({ value: event.target.value });
  }

  handleSubmit (event) {
    console.log('controlled form submitted: ' + this.state.value);
    event.preventDefault();
  }

  render () {
    return (
      <form className="exhibition-selector" onSubmit={this.handleSubmit}>
        <h2>Please choose an exhibition</h2>
        <select name="exhibitions" value={this.state.value} onChange={this.handleChange}>
          <option value="red">red</option>
          <option value="blue">blue</option>
          <option value="green">green</option>
        </select>
        <p>
          <button type="submit">Show Exhibition</button>
        </p>
      </form>
    );

  }

}
// another way of passing storeInput that doesn't create a new function
// <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input } } />

export default ExhibitionPicker;
