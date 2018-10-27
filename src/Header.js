import React, { Component } from 'react';
import './App.css';


export class Header extends Component {
	render() {

		return (	
			<nav>
			<h1 tabIndex="0">Hidden Gems Around the US's First Dark Sky Reserve</h1>
			<a href="#locationfilter" class="skip-link">Skip to main content - Filter locations by type</a>
			</nav>
		);
	}
}

export default Header