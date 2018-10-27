import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Polygon, Marker, GoogleApiWrapper} from 'google-maps-react';
import moonicon from './moonicon.png';
import mapStyles from './mapStyles.json'; // Lars Entrop's Red Darkness was starting point for map style https://snazzymaps.com/style/18566/red-darkness 

// Getting Google Maps working with google-maps-react - npm documentation helpful:  https://www.npmjs.com/package/google-maps-react

export class MyMap extends Component {
	state = {
		infoShowing: false,
		selectedLocation: {},
		activeMarker: {}
	}
	
	//Shows InfoWindow when user clicks marker
	onMarkerClick = (props, marker, event) =>
		this.setState({
			selectedLocation: props,
			activeMarker: marker,
			infoShowing: true
    });
	
	//Closes InfoWindow when user clicks map
	mapClick = (props) => {
		if (this.state.infoShowing) {
			this.setState({
				infoShowing: false,
				activeMarker: null
			})
		}
	};
	
	//Closes InfoWindow when mouse leaves map
	mouseLeave = () => {
		var map = document.getElementById("map-container");
		map.addEventListener("mouseleave", () =>  { 
			this.setState({
				infoShowing: false,
				activeMarker: null
			})
		})
	}
		
	render() {
		const darkSkyCore1 = [
			{lat: 44.200529, lng: -114.6564147},
			{lat: 44.159688, lng: -114.8479567},
			{lat: 43.95352, lng: -114.7397447},
			{lat: 44.059578, lng: -114.5740057},
			{lat: 44.200529, lng: -114.6564147}
		];
		const { listDisplay, google } = this.props

		return (	
			<div id="map-container">
			<Map google = {google}
				onClick={this.mapClick}
				onReady={this.mouseLeave}
				initialCenter = {{
					lat: 44.015768,
					lng: -114.344747}}
				zoom={8.6}
				styles = {mapStyles}>
				
 				{listDisplay.map((place) => (
				<Marker key={place.id} 
					onClick={this.onMarkerClick}
					name={place.title}
					position={place.location}
					icon={{url: moonicon}}
					/>
				))}
				
					{listDisplay.map((place) => (
				<InfoWindow	key={place.id} marker={this.state.activeMarker} visible={this.state.infoShowing}>
						<div>
						<h1>{this.state.selectedLocation.name}</h1>
						</div>
				</InfoWindow>		
						
				))}
				
				<Polygon
					paths={darkSkyCore1}
					strokeColor="#4b0082"
					strokeOpacity={0.4}
					strokeWeight={2}
					fillColor="#4b0082"
					fillOpacity={0.25}
				/>
			</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCtbHqdrnj-iibIguzGZngB4__2qR1MpwM")
})(MyMap)
