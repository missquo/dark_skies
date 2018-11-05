import React, { Component } from 'react';
import './App.css';
import MyMap from './Map.js';
import Darklist from './Darklist.js';
import Header from './Header.js';
import darkskylist from './darkskylist.json';

class App extends Component {
	state = {
		fullList: darkskylist,
		showingList: darkskylist,
		allMarkers: [],
		allNPS: [],
		allCamp: [],
		allRec: [],
		allTrail: [],
		infoShowing: false,
		selectedLocation: "",
		activeMarker: {}
	}

	componentDidMount(){		
		//Verify connection to Google Maps
		fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCtbHqdrnj-iibIguzGZngB4__2qR1MpwM&callback=initMap')
		.catch((error) => window.alert("Sorry, Google maps cannot be loaded at this time.\n" + error))
		
		// Fetch data from National Park Service
		fetch('https://developer.nps.gov/api/v1/parks?stateCode=ID&api_key=VKaJBfPIuK5bD0hgyvivuwIkYGE9tCJEIY3GpG0z')
			.then((resp) => resp.json())
			.then((allNPS) => {
			this.setState({ allNPS })
			console.log(this.state.allNPS)
			})			
		
		//Fetch data from Recreation.gov via proxy for CORS errors
		// Thanks to user at StackOverflow https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
		fetch('https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas/1027/facilities?query=trailhead&limit=50&offset=0&full=false&state=ID&activity=hiking&apikey=014f5b00-d3c3-45bf-a7b2-75a6563e0de6')	
			.then((resp) => resp.json())
			.then((allTrail) => {
			this.setState({ allTrail })
			console.log(this.state.allTrail)
			})
			
		fetch('https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas?query=wilderness&limit=25&offset=0&full=false&state=ID&sort=Name&apikey=014f5b00-d3c3-45bf-a7b2-75a6563e0de6')	
			.then((resp) => resp.json())
			.then((allRec) => {
			this.setState({ allRec })
			console.log(this.state.allRec)
		})
		
		fetch('https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas/1027/facilities?limit=50&offset=0&full=false&apikey=014f5b00-d3c3-45bf-a7b2-75a6563e0de6')	
			.then((resp) => resp.json())
			.then((allCamp) => {
			this.setState({ allCamp })
			console.log(this.state.allCamp)				
	})}
	
	//Add references to markers to an array
	addMarker = (element) => 
      this.state.allMarkers.push(element)
      
	//Shows InfoWindow when user clicks marker
	markerClick = (props, marker, event) => {
		this.setState({
			selectedLocation: props.name,
			activeMarker: marker,
			infoShowing: true
    });
	console.log(this.state.allMarkers)
	}
	
	//Should display InfoWindow when list items clicked
	listItemClick = (item) => {
		let thisMarker
		this.state.allMarkers.map(marker => {
			if (marker.props.name === item.title) {
				thisMarker = marker
				console.log(marker)
			}
		})
		this.setState({
			selectedLocation: item.title,
			activeMarker: thisMarker,
			infoShowing: true
			})
			
		console.log(item)
	}
	
	//Closes InfoWindow when user clicks map
	mapClick = (props) => {
		if (this.state.infoShowing) {
			this.setState({
				infoShowing: false,
				activeMarker: null
			})
		}
	};
	
	/*Closes InfoWindow when mouse leaves map
	mouseLeave = () => {
		var map = document.getElementById("map-container");
		map.addEventListener("mouseleave", () =>  { 
			this.setState({
				infoShowing: false,
				activeMarker: null
			})
		})
	}
*/
	updateList = (type) => {

		if (type === "all") {
			this.setState({	showingList: this.state.fullList })
			console.log(this.state.selected)
		} else {
			this.setState({ showingList: this.state.fullList.filter(item => item.type === type)})
		}
    }
	
	render() {
		return (
		<div>
			<Header>
			</Header>
			<MyMap listDisplay = {this.state.showingList}
					markerArray = {this.addMarker}
					onMapClick = {this.mapClick}
					onMarkerClick = {this.markerClick}
					active = {this.state.activeMarker}
					info = {this.state.infoShowing}
					selected = {this.state.selectedLocation}
					markerRef = {this.state.allMarkers}>
			</MyMap>
			<Darklist onFilterList = {this.updateList} 
					listDisplay = {this.state.showingList} 
					onListClick = {this.mapClick}
					onItemClick = {this.listItemClick}
					nps = {this.state.allNPS} 
					rec = {this.state.allRec} 
					trail = {this.state.allTrail} 
					camp = {this.state.allCamp}>
			</Darklist>
		</div>
		);
	}
}
 
export default App