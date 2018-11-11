import React, { Component } from "react";
import "./App.css";
import Darklist from "./Darklist.js";
import Header from "./Header.js";
import darkskylist from './darkskylist.json';
import mapStyles from './mapStyles.json';
import moonicon from "./moonicon.png";

class App extends Component {
	state = {
		fullList: darkskylist,
		showingList: darkskylist,
		allNPS: [],
		allCamp: [],
		allRec: [],
		allTrail: [],
		markerArray: [],
		infoWindows: []
	};

	//Check for Google Maps authentication errors, and display message to user when they occur
	gm_authFailure = () => {
		window.alert("Google Maps has failed to load.")
		window.document.getElementById("map").innerHTML = "<span>There was an error loading Google Maps.</span>";
	};

	componentDidMount() {
		// Fetch data from National Park Service
		fetch('https://developer.nps.gov/api/v1/parks?stateCode=ID&api_key=VKaJBfPIuK5bD0hgyvivuwIkYGE9tCJEIY3GpG0z')
			.then((resp) => resp.json())
			.then((allNPS) => {
			this.setState({ allNPS })
			})			
		
		//Fetch data from Recreation.gov via proxy for CORS errors
		// Thanks to user at StackOverflow https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
		fetch('https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas/1027/facilities?query=trailhead&limit=50&offset=0&full=false&state=ID&activity=hiking&apikey=014f5b00-d3c3-45bf-a7b2-75a6563e0de6')	
			.then((resp) => resp.json())
			.then((allTrail) => {
			this.setState({ allTrail })
			})
			
		fetch('https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas?query=wilderness&limit=25&offset=0&full=false&state=ID&sort=Name&apikey=014f5b00-d3c3-45bf-a7b2-75a6563e0de6')	
			.then((resp) => resp.json())
			.then((allRec) => {
			this.setState({ allRec })
		})
		
		fetch('https://cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas/1027/facilities?limit=50&offset=0&full=false&apikey=014f5b00-d3c3-45bf-a7b2-75a6563e0de6')	
			.then((resp) => resp.json())
			.then((allCamp) => {
			this.setState({ allCamp })			
		})
	
		// Critical help in sorting Google map loading: https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
		this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCtbHqdrnj-iibIguzGZngB4__2qR1MpwM&v=3&callback=initMap");
		window.initMap = this.initMap;
		
		// Check for Google authentication errors
		window.gm_authFailure = () => this.gm_authFailure();
	}
  
	// Critical help in sorting Google map loading: https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
	loadScript = (src) => {
		let ref = window.document.getElementsByTagName("script")[0];
		let script = window.document.createElement("script");
		script.src = src;
		script.async = true;
		ref.parentNode.insertBefore(script, ref);
	}
  
	// Update displayed locations
  	updateList = (type) => {
		this.state.markerArray.map(marker => marker.setVisible(true));
		if (type === "all") {
			this.setState({	showingList: this.state.fullList });			
		} else {
			this.setState({ showingList: this.state.fullList.filter(item => item.type === type)});
			this.state.markerArray.filter(marker => marker.type !== type).map(marker => marker.setVisible(false));
		}
    }
	
	// Close all infowindows
	closeAllInfo = () => {
		let allInfo = this.state.infoWindows;
		allInfo.forEach(info => {	
			info.close()
		})
	};
    
	// Initialize map
	initMap = () => {
		let map = new window.google.maps.Map(document.getElementById("map"), {
			center: { lat: 44.015768, lng: -114.344747 },
			zoom: 8.6,
			styles: mapStyles
		});
		let markers = this.state.showingList.map((place) => {
			let marker = new window.google.maps.Marker({
				map: map,
				position: place.location,
				query: place.query,
				title: place.title,
				id: place.id,
				icon: moonicon,
				type: place.type
			});
			let infoWindow = new window.google.maps.InfoWindow({
				title: place.title,
			});
			infoWindow.setContent(place.title);
			this.state.infoWindows.push(infoWindow);
			marker.addListener("click", () => infoWindow.open(map, marker));
			return marker;
		});
		this.setState({ markerArray: markers });
	};
 
   render() {
		return (
			<div className="application">
				<Header	updateList={this.updateList} closeInfo={this.closeAllInfo} />
				<main className="bodyarea">
					<Darklist showingList={this.state.showingList}
					nps = {this.state.allNPS} 
					rec = {this.state.allRec} 
					trail = {this.state.allTrail} 
					camp = {this.state.allCamp} 
					allInfoWindows = {this.state.infoWindows}
					allMarkers = {this.state.markerArray}
					/>
					<div className="map1">
						<div className="map2" role="application">
							<div id="map" tabIndex="-1"><span>Google maps is attempting to load...  </span>
							</div>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export default App