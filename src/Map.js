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
		
		const darkSkyCore2 = [
			{lat: 44.158658, lng: -114.9595197},
			{lat: 44.1736498, lng: -115.018864},
			{lat: 44.123008, lng: -115.0482977},
			{lat: 44.096217, lng: -115.0006237},
			{lat: 44.079259, lng: -115.0205047},
			{lat: 44.035899, lng: -115.0492807},
			{lat: 44.010657, lng: -114.9852037},
			{lat: 43.991254, lng: -114.9890627},
			{lat: 43.980898, lng: -114.9700257},
			{lat: 43.971278, lng: -114.9736177},
			{lat: 43.950408, lng: -114.9931647},
			{lat: 43.937915, lng: -114.9740697},
			{lat: 43.913675, lng: -114.9987737},
			{lat: 43.864399, lng: -114.9796687},
			{lat: 43.915051, lng: -114.8870567},
			{lat: 44.080124, lng: -114.8953777}
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
					fillOpacity={0.55}
				/>
				
				<Polygon
					paths={darkSkyCore2}
					strokeColor="#4b0082"
					strokeOpacity={0.4}
					strokeWeight={2}
					fillColor="#4b0082"
					fillOpacity={0.55}
				/>
				
			</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCtbHqdrnj-iibIguzGZngB4__2qR1MpwM")
})(MyMap)
