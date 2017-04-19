import React from 'react';

import ReactDOM from 'react-dom';
// or I can import just the render method
//import { render } from 'react-dom';

// import { BrowserRouter, Match, Miss } from 'react-router';

import Header from './components/Header';
import ProductList from './components/ProductList';
import Clock from './components/Clock';
// import NotFound from './components/NotFound';

import { formatPrice } from './extra';

// function tick () {
// 	 ReactDOM.render(
// 		 <div>
// 			 <Header color="red" />
// 			 <Clock />
// 		 </div>,
// 		 document.getElementById('root')
// 	 );
// }
// setInterval(tick, 1000);

// const Root = () => {
// 	 return (
// 			<BrowserRouter>
// 				<div>
// 					<p><a href="/">products</a></p>
// 					<p><a href="/head">head</a></p>
// 					<Match exactly pattern="/" component={Clock} />
// 					<Match exactly pattern="/head" component={Header} />
// 					<Miss component={NotFound} />
// 				</div>
// 			</BrowserRouter>
// 	);
// };

// ReactDOM.render(<Root />, document.querySelector('#root'));

const name = "Mono";
// if I imported just the render method
//render(<h1>mama</h1>, document.querySelector('#root'));
ReactDOM.render(
	<div>
		<Clock />
		<ProductList />
		<Header/>
		<h1>Hello {name}, again!</h1>
		<h2>{`the name is ${name}`}</h2>
		<h3>{formatPrice(1233)}</h3>
	</div>,
	document.getElementById('root')
);

// export default Root;
