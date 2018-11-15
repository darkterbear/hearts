import React, { Component } from 'react'
import Card from './Card'

export default class GamePage extends Component {
	render() {
		return (
			<div className="wrapper">
				<div className="myCards">
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
					<Card suit={0} number={10} />
				</div>
				<div className="leftCards" />
				<div className="rightCards" />
				<div className="acrossCards" />
			</div>
		)
	}
}
