import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Polygon, Marker, GoogleApiWrapper} from 'google-maps-react';
import moonicon from './moonicon.png';
import mapStyles from './mapStyles.json'; // Lars Entrop's Red Darkness was starting point for map style https://snazzymaps.com/style/18566/red-darkness 

// Getting Google Maps working with React - npm documentation helpful:  https://www.npmjs.com/package/google-maps-react

export class MyMap extends Component {
	render() {
		const darkSkyCore1 = [
			{lat: 44.200529, lng: -114.6564147},
			{lat: 44.159688, lng: -114.8479567},
			{lat: 43.95352, lng: -114.7397447},
			{lat: 44.059578, lng: -114.5740057},
			{lat: 44.200529, lng: -114.6564147}
		];
		const { listDisplay } = this.props
		// const { google } = this.props
		return (	
			<div id="map-container">
			<Map google = {this.props.google}
				initialCenter = {{
					lat: 44.015768,
					lng: -114.344747}}
				zoom={8.6}
				styles = {mapStyles}>
				
 				{listDisplay.map((place) => (
				<Marker key={place.id} 
					name={place.title}
					position={place.location}
					icon={{url: moonicon}}
					/>
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
