import React, { Component } from 'react';
import './App.css';

class Header extends Component {
	render () {
	    const { updateList, closeInfo } = this.props;
		return (	
			<div>
				<header>
					<h1 tabIndex="0">Enjoying the US's First Dark Sky Reserve</h1>
					<a href="#filter-container" className="skip-link">Skip to main content - Filter locations by type</a>
				</header>
				<div id="filter-container">
					<div className="filter-options" onClick={() => closeInfo()}>
						<select tabIndex="0" onChange={(event) => updateList(event.target.value)}>
							<option role="tablist" value="all">All Locations</option>
							<option role="tablist" value="point">Points of Interest</option>
							<option role="tablist" value="trail">Hiking Trails</option>
							<option role="tablist" value="camp">Campgrounds</option>
						</select>
					</div>
				</div>
			</div>

		);
	}
}
	
export default Header