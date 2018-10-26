import React, { Component } from 'react';
import './App.css';
import MyMap from './Map.js';
import Darklist from './Darklist.js';
import Header from './Header.js';

class App extends Component {
	render() {
		return (
		<div>
			<Header>
			</Header>
			<MyMap>
			</MyMap>
			<Darklist>
			</Darklist>
		</div>
		);
	}
}
 
export default App