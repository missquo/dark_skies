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
		allNPS: []
	}
	
	componentDidMount(){
		fetch('https://developer.nps.gov/api/v1/parks?stateCode=ID&api_key=VKaJBfPIuK5bD0hgyvivuwIkYGE9tCJEIY3GpG0z')
			.then((resp) => resp.json())
			.then((allNPS) => {
			this.setState({ allNPS })
			console.log(this.state.allNPS)
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
			<Darklist onFilterList = {this.updateList} listDisplay = {this.state.showingList}>
			</Darklist>
		</div>
		);
	}
}
 
export default App