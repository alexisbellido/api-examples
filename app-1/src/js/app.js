import React from 'react';

import ReactDOM from 'react-dom';

import Header from './components/Header';

const name = "Mono";

ReactDOM.render(
	<div>
		<Header color="red" />
		<h1>Hello {name}, again!</h1>
		<h2>{`the name is ${name}`}</h2>
	</div>,
	document.getElementById('root')
);
