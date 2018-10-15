import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll.js';
import ErrorBoundry from '../components/ErrorBoundry.js';
class App extends Component
{
	constructor()
	{
		super()
		this.state = 
		{
			robots : [],
			searchField : ''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(user => this.setState({robots : user}));
	}

	onSearchChange = (event) =>
	{
		this.setState({searchField : event.target.value});
	}

	render(){
		if(this.state.robots.length === 0)
		{
			return(<h1>Loading</h1>);
		}else{
			const robotList = this.state.robots.filter(robot=> robot.name.toLowerCase().includes(this.state.searchField));
			return (
				<div className="tc">
					<h1 className="f1">RoboFriends</h1>
					<SearchBox searchChange = {this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots = {robotList} />
						</ErrorBoundry>						
					</Scroll>
				</div>
				);
		}
	}
	
}

export default App;