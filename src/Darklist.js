import React, { Component } from 'react';
import './App.css';

export class Darklist extends Component {
	state = {
		filter: ""
	}
	
	filterChange = filter => {
		this.setState({ filter })
		this.props.onFilterList(filter)
		console.log(filter)
	}
		
	render() {
		const { filter } = this.state
		return (	
			<div id="darklist">
			      <div className="filter-options">
        <h2>Filter Results</h2>
        <select tabIndex="1" value={filter} onChange={(event) => this.filterChange(event.target.value)}>
          <option role="tablist" value="all">All Locations</option>
		  <option role="tablist" value="point">Points of Interest</option>
		  <option role="tablist" value="trail">Hiking Trails</option>
		  <option role="tablist" value="camp">Campgrounds</option>
        </select>
		</div>
			<ul id="currentList"></ul>
			<div className="darkitem">
				<p>Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket!Hello world and Sprocket!Hello world and Sprocket!Hello world and Sprocket! Hello world and Sprocket!</p>
				</div>
				
				<div className="darkitem">
				<p>Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket!Hello world and Sprocket!Hello world and Sprocket!Hello world and Sprocket! Hello world and Sprocket!</p>
				</div>
				
				<div className="darkitem">
				<p>Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket!Hello world and Sprocket!Hello world and Sprocket!Hello world and Sprocket! Hello world and Sprocket!</p>
				</div>
				
				<div className="darkitem">
				<p>Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket!Hello world and Sprocket!Hello world and Sprocket!Hello world and Sprocket! Hello world and Sprocket!</p>
				</div>
				
				<div className="darkitem">
				<p>Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket! Hello world and Sprocket!Hello world and Sprocket!Hello world and Sprocket!Hello world and Sprocket! Hello world and Sprocket!</p>
				</div>
			</div>
		);
	}
}

export default Darklist
