import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Polygon, Marker, GoogleApiWrapper} from 'google-maps-react';
import moonicon from './moonicon.png';

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
		// const { google } = this.props
		return (			
			<Map google = {this.props.google}
				initialCenter = {{
					lat: 43.835768,
					lng: -114.5704747}}
				zoom={9}>
 
				<Marker
					name={'Borah Peak'}
					position={{lat: 44.1381578, lng: -113.7825817}}
					icon={{url: moonicon}}
				/>
				<Marker
					name={'Craters of the Moon'}
					position={{lat: 43.4622159, lng: -113.5640147}}
					icon={{url: moonicon}}
				/>
				<Polygon
					paths={darkSkyCore1}
					strokeColor="#4b0082"
					strokeOpacity={0.4}
					strokeWeight={2}
					fillColor="#4b0082"
					fillOpacity={0.25}
				/>
			</Map>
    );
  }
}
 

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCtbHqdrnj-iibIguzGZngB4__2qR1MpwM")
})(MyMap)
