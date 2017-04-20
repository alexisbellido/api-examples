import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import ExhibitionPicker from './components/ExhibitionPicker';
import ExhibitionObjects from './components/ExhibitionObjects';

class App extends React.Component {
	// TODO move logic here and pass via props to ExhibitionObjects and ExhibitionPicker
	render () {
		return (
			<div>
				<Header />
				<ExhibitionPicker />
				<ExhibitionObjects />
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
