import React, { Component } from 'react';
import './App.css';

export class Darklist extends Component {
	state = {
		filter: "all"
	}
	
	filterChange = filter => {
		this.setState({ filter })
		setTimeout(() => {this.props.onFilterList(filter)}, 50)
		console.log(filter)		
	}
		
	render() {
		const { filter } = this.state
		const { listDisplay, nps } = this.props
		return (	
			<div id="darklist">
				<div className="filter-options">
					<h2>Filter Results</h2>
					<select id="locationselect" tabIndex="0" value={filter} onChange={(event) => this.filterChange(event.target.value)}>
						<option role="tablist" value="all">All Locations</option>
						<option role="tablist" value="point">Points of Interest</option>
						<option role="tablist" value="trail">Hiking Trails</option>
						<option role="tablist" value="camp">Campgrounds</option>
					</select>
				</div>
				<ul id="currentList">
					{listDisplay.map((place) => {
						console.log(nps)
						console.log(listDisplay)
					if (nps.data) {
					let description = 'Data is currently unavailable';
					nps.data.map(park => {
						if (park.name == place.query) {
							description = park.description
						}
					});
					return (
					<li key={place.id} className='place' tabIndex='2'>
					<div className='place-details'>
						<p>{place.title}</p>
						<p>{description}</p>
					</div>
				</li>
				);
					}})}
			</ul>
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