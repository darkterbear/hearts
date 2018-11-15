import React, { Component } from 'react'
import Card from './Card'

export default class GamePage extends Component {
	render() {
		return (
			<div className="wrapper game">
				<div className="myCards">
					<Card suit={3} number={3} />
					<Card suit={3} number={9} />
					<Card suit={3} number={10} />
					<Card suit={2} number={3} />
					<Card suit={2} number={4} />

					<Card suit={2} number={10} />

					<Card suit={1} number={3} />

					<Card suit={1} number={4} />
					<Card suit={1} number={10} />

					<Card suit={0} number={1} />
					<Card suit={0} number={3} />
					<Card suit={0} number={6} />
					<Card suit={0} number={10} />
				</div>
				<div className="leftCards" />
				<div className="rightCards" />
				<div className="acrossCards" />
			</div>
		)
	}
}
