import React, { Component } from 'react';
import './App.css';

function Header(props) {
	return (	
		<nav>
		<h1 tabIndex="0">Enjoying the US's First Dark Sky Reserve</h1>
		<a href="#locationfilter" className="skip-link">Skip to main content - Filter locations by type</a>
		</nav>
	);
}

export default Header