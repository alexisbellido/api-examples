import React from 'react';
import axios from 'axios';

class ExhibitionPicker extends React.Component {
  // Class components should always call the base constructor with props.
  constructor (props) {
    super(props);

    this.token = 'cdc39c5b5ef27f52b9131b54cb700b5a';

    // This binding is necessary to make `this` work in the callback
    // this.handleChange = this.handleChange.bind(this);
    // this.showExhibitionObjects = this.showExhibitionObjects.bind(this);

    this.state = {
      exhibitions: [],
      current_exhibition_id: 0,
      collection_objects: []
    };
  }

  // componentDidMount () {
  //   // TODO call the api from app using method passed here via props
  //   const count = 10;
  //   // exhibitions list from API
  //   const url = `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getList&page=1&per_page=${count}&access_token=${this.token}`;
  //
  //   // exhibitions list from local file
  //   // const url = `http://localhost:8888/src/js/exhibitions.json`;
  //
  //   axios.get(url)
  //     .then(response => {
  //       const exhibitions = response.data.exhibitions;
  //       // this courtesy of arrow function
  //       this.setState({ exhibitions: exhibitions });
  //       this.setState({ current_exhibition_id: exhibitions[0].id });
  //       this.showExhibitionObjects();
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // handleChange (event) {
  //   // Show objects in chosen exhibition
  //   this.setState({ current_exhibition_id: event.target.value });
  //   console.log(`current_exhibition_id: ${this.state.current_exhibition_id}`);
  //   const url = `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&exhibition_id=${this.state.current_exhibition_id}&page=1&per_page=5&access_token=${this.token}`;
  //
  //   axios.get(url)
  //     .then(response => {
  //       const collection_objects = response.data.objects;
  //       // property value shortcut courtesy of ES6
  //       this.setState({ collection_objects });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // {this.state.exhibitions.map(exhibition =>
  //   <option key={exhibition.id} value={exhibition.id}>{exhibition.title}</option>
  // )}
  render () {
    return (
      <form className="exhibition-selector">
        <h2>Choose an exhibition</h2>
        <select name="exhibitions" value={this.props.currentExhibitionId} onChange={this.props.loadExhibitions}>
           <option value="red">red</option>
           <option value="green">green</option>
        </select>
      </form>
    );

  }

}

export default ExhibitionPicker;
