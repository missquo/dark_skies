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
		allNPS: [],
		allCamp: [],
		allRec: [],
		allTrail: []
	}
	
	componentDidMount(){
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
	

	updateList = (type) => {

		if (type === "all") {
			this.setState({	showingList: this.state.fullList })
			console.log(this.state.showingList)
		} else {
			this.setState({ showingList: this.state.fullList.filter(item => item.type === type)})
			console.log(type)
			console.log(this.state.showingList)
		}
    }
	
	render() {
		return (
		<div>
			<Header>
			</Header>
			<MyMap listDisplay = {this.state.showingList}>
			</MyMap>
			<Darklist onFilterList = {this.updateList} 
					listDisplay = {this.state.showingList} 
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