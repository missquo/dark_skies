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
		const { listDisplay } = this.props
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
			<ul id="currentList">
				{listDisplay.map((place) => (
				<li key={place.id} className='place'>
					<div className='place-details'>
						<p>{place.title}</p>
						<p>{place.description}</p>
					</div>
				</li>
				))}
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