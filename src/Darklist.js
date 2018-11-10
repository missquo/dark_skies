import React, { Component } from 'react';
import './App.css';

export class Darklist extends Component {
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
	
	render () {
		const { showingList, nps, rec, trail, camp, allInfoWindows, allMarkers } = this.props;
		let places = Array.from(document.querySelectorAll(".place"));
		places.forEach((place, i) => {
			place.addEventListener("click", () => {
				allMarkers.map(marker => {	
					if (marker.title === place.title) {
						marker.setAnimation(window.google.maps.Animation.BOUNCE);
						allInfoWindows[i].setContent("<div className='info'>" + marker.title + "</div>");
						allInfoWindows[i].open(this.map, marker);
					} 
				setTimeout(marker.setAnimation(window.google.maps.Animation.null), 10000);
			return marker;
        });
      });
    })
		
		return (
			<div id="darklist-scroll">
				<ul id="currentList">
					{showingList.map((place) => {
					let description = 'Data is currently unavailable';
					let provider = "This information has been provided by Recreation.gov."
					let recsites = rec.RECDATA;
					let trails = trail.RECDATA;
					let campsites = camp.RECDATA;
					if (nps.data) {
						nps.data.forEach(park => {
							if (park.name === place.query) {
								description = park.description
								provider = "This information has been provided by The National Park Service."	
							}
					})};
					
					if (recsites) {
					recsites.forEach(recreation => {
						if (recreation.RecAreaName === place.query) {
							description = recreation.RecAreaDescription
						}
					})};
					
					if (trails) {
					trails.forEach(trailhead => {
						if (trailhead.FacilityName === place.query) {
							description = trailhead.FacilityDescription
						}
					})};
					
					if (campsites) {
					campsites.forEach(campsite => {
						if (campsite.FacilityName === place.query) {
							description = campsite.FacilityDescription
						}
					})};
					let formatted = this.formatDescription(description);
					return (
						<li className="place" key={place.id} tabIndex='2' title={place.title}>
							<div className='place-details'>
								<h2>{place.title}</h2>
								<p>{formatted}</p>
								<p className="provider">{provider}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	)};
};

export default Darklist