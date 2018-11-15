import React, { Component } from 'react'
import Card from './Card'

export default class GamePage extends Component {
	constructor(props) {
		super(props)

		const bundle = props.location.state

		this.state = {
			cards: bundle.hand
		}
	}
	render() {
		const cards = this.state.cards
			? this.state.cards.map(c => {
					return <Card suit={c.suit} number={c.number} />
			  })
			: null
		return (
			<div className="wrapper game">
				<div className="myCards">{cards}</div>
				<div className="leftCards" />
				<div className="rightCards" />
				<div className="acrossCards" />
			</div>
		)
	}
}
