import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from './components/Header';
import ExhibitionPicker from './components/ExhibitionPicker';
import ExhibitionObjects from './components/ExhibitionObjects';

class App extends React.Component {
	// Class components should always call the base constructor with props.
	constructor (props) {
		super(props);

		this.token = 'cdc39c5b5ef27f52b9131b54cb700b5a';

		// This binding is necessary to make `this` work in the callback
		this.loadExhibitions = this.loadExhibitions.bind(this);
		this.changeExhibition = this.changeExhibition.bind(this);

		this.state = {
			exhibitions: [],
			current_exhibition_id: 0,
			current_exhibition_title: '',
			collection_objects: []
		};
	}

	loadExhibitions () {
		const count = 10;
    // exhibitions list from API
    const url = `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getList&page=1&per_page=${count}&access_token=${this.token}`;

    // exhibitions list from local file
    // const url = `http://localhost:8888/src/js/exhibitions.json`;

    axios.get(url)
      .then(response => {
        const exhibitions = response.data.exhibitions;
        // this courtesy of arrow function
        this.setState({ exhibitions: exhibitions });
      })
      .catch(error => {
        console.log(error);
      });
	}

	changeExhibition (event) {
		const current_exhibition_id = event.target.value;
		const url = `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&exhibition_id=${current_exhibition_id}&page=1&per_page=5&access_token=${this.token}`;

		axios.get(url)
		.then(response => {
			const collection_objects = response.data.objects;
			// property value shortcut courtesy of ES6
			this.setState({ collection_objects });
			this.setState({ current_exhibition_id });
		})
		.catch(error => {
			console.log(error);
		});
	}

	render () {
		return (
			<div>
				<ExhibitionPicker currentExhibitionId={this.state.current_exhibition_id}
					exhibitions={this.state.exhibitions}
					loadExhibitions={this.loadExhibitions}
					changeExhibition={this.changeExhibition} />
				<ExhibitionObjects collection_objects={this.state.collection_objects}
					changeExhibition={this.changeExhibition}
					currentExhibitionId={this.state.current_exhibition_id} />
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
