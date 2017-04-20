import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import ExhibitionPicker from './components/ExhibitionPicker';
import ExhibitionObjects from './components/ExhibitionObjects';

class App extends React.Component {
	// TODO move logic here and pass methods, and some data?, via props to ExhibitionObjects and ExhibitionPicker

	// Class components should always call the base constructor with props.
	constructor (props) {
		super(props);

		this.token = 'cdc39c5b5ef27f52b9131b54cb700b5a';

		// This binding is necessary to make `this` work in the callback
		this.loadExhibitions = this.loadExhibitions.bind(this);
		this.showExhibitionObjects = this.showExhibitionObjects.bind(this);

		this.state = {
			exhibitions: [],
			current_exhibition_id: 0,
			collection_objects: []
		};
	}

	loadExhibitions (event) {
		this.setState({ current_exhibition_id: event.target.value });
		// TODO check componentWillUpdate() and componentDidUpdate()
		// https://facebook.github.io/react/docs/react-component.html#componentwillmount
		console.log(`Load exhibitions for ${this.state.current_exhibition_id}...`);
	}

  showExhibitionObjects () {
    console.log(`Show objects...`);
  }

	render () {
		return (
			<div>
				<Header />
				<ExhibitionPicker currentExhibitionId={this.state.current_exhibition_id} loadExhibitions={this.loadExhibitions} />
				<ExhibitionObjects />
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
