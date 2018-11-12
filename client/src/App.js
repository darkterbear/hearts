import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MenuPage from './MenuPage'

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" component={MenuPage} />
				</Switch>
			</Router>
		)
	}
}
