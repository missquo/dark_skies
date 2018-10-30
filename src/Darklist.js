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
	
	//Reduce 
	formatDescription = description => {
		const sentenceCount = "."
		let count = 0
		let index
		let newPara = document.createElement("p")
		while (count < 4) {
			index = description.indexOf(sentenceCount, (index + 1))
			count = count + 1
		}
		return newPara.innerHTML=description.slice(0, (index + 1))
	}
			
		
	render() {
		const { filter } = this.state
		const { listDisplay, nps, rec, trail, camp } = this.props
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
					let description = 'Data is currently unavailable';
					let provider = "This information has been provided by Recreation.gov."
					let recsites = rec.RECDATA;
					let trails = trail.RECDATA;
					let campsites = camp.RECDATA;
					if (nps.data) {
						nps.data.map(park => {
							if (park.name == place.query) {
								description = park.description
								provider = "This information has been provided by The National Park Service."								
							}
					})};
					
					if (recsites) {
					recsites.map(recreation => {
						if (recreation.RecAreaName == place.query) {
							description = recreation.RecAreaDescription
						}
					})};
					
					if (trails) {
					trails.map(trailhead => {
						if (trailhead.FacilityName == place.query) {
							description = trailhead.FacilityDescription
						}
					})};
					
					if (campsites) {
					campsites.map(campsite => {
						if (campsite.FacilityName == place.query) {
							description = campsite.FacilityDescription
						}
					})};
					let formatted = this.formatDescription(description);
					return (
					<li key={place.id} className='place' tabIndex='2'>
					<div className='place-details'>
						<p>{place.title}</p>
						<p>{formatted}</p>
						<p>{provider}</p>
					</div>
				</li>
				);
					})}
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