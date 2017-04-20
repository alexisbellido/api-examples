import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import ExhibitionPicker from './components/ExhibitionPicker';

const name = "Luca";

ReactDOM.render(
	<div>
		<Header color="red" />
		<h2>Hello {name}!</h2>
		<ExhibitionPicker />
	</div>,
	document.getElementById('root')
);
