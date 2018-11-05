import React, { Component } from 'react';
import './App.css';

export class Darklist extends Component {
	state = {
		filter: "all"
	}
	
	filterChange = filter => {
		this.setState({ filter })
		setTimeout(() => {this.props.onFilterList(filter)}, 50)	
	}
	
	//Reduce description length and remove tags
	formatDescription = description => {
		const sentenceCount = "."
		let count = 0
		let index
		while (count < 4) {
			index = description.indexOf(sentenceCount, (index + 1))
			count = count + 1
		}
		if (index > 0) {
			description = description.slice(0, (index + 1))
		}
		let open = description.search("<")
		let close = description.search(">")
		while (open > -1) {
			let slice
			slice = description.slice(open, (close + 1))
			description = description.replace(slice,' ')
			open = description.search("<")
			close = description.search(">")
		}				
		return description
	}			
		
	render() {
		const { filter } = this.state
		const { listDisplay, nps, rec, trail, camp, onListClick, onItemClick } = this.props
		return (	
			<div id="darklist-container">
				<div id="filter-container">
				<div className="filterHead"><h2>Filter Results</h2></div>
				<div className="filter-options" onClick={onListClick}>
					<select tabIndex="0" value={filter} onChange={(event) => this.filterChange(event.target.value)}>
						<option role="tablist" value="all">All Locations</option>
						<option role="tablist" value="point">Points of Interest</option>
						<option role="tablist" value="trail">Hiking Trails</option>
						<option role="tablist" value="camp">Campgrounds</option>
					</select>
				</div>
				</div>
				<div id="darklist-scroll">
				<ul id="currentList">
					{listDisplay.map((place) => {
					let description = 'Data is currently unavailable';
					let provider = "This information has been provided by Recreation.gov."
					let recsites = rec.RECDATA;
					let trails = trail.RECDATA;
					let campsites = camp.RECDATA;
					if (nps.data) {
						nps.data.map(park => {
							if (park.name === place.query) {
								description = park.description
								provider = "This information has been provided by The National Park Service."	
							}
					})};
					
					if (recsites) {
					recsites.map(recreation => {
						if (recreation.RecAreaName === place.query) {
							description = recreation.RecAreaDescription
						}
					})};
					
					if (trails) {
					trails.map(trailhead => {
						if (trailhead.FacilityName === place.query) {
							description = trailhead.FacilityDescription
						}
					})};
					
					if (campsites) {
					campsites.map(campsite => {
						if (campsite.FacilityName === place.query) {
							description = campsite.FacilityDescription
						}
					})};
					let formatted = this.formatDescription(description);
					return (
					<li key={place.id} className='place' tabIndex='2'>
					<div className='place-details' onClick={() => onItemClick(place)}>
						<h2>{place.title}</h2>
						<p>{formatted}</p>
						<p className="provider">{provider}</p>
					</div>
				</li>
				);
					})}
			</ul>
			</div>
			</div>
		);
	}
}

export default Darklist