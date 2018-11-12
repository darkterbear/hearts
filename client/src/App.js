import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MenuPage from './MenuPage'
import JoinPage from './JoinPage'
import LobbyPage from './LobbyPage'

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={MenuPage} />
					<Route exact path="/join" component={JoinPage} />
					<Route exact path="/lobby" component={LobbyPage} />
				</Switch>
			</Router>
		)
	}
}
