import React, { Component } from 'react'
import Card from './Card'

export default class GamePage extends Component {
	constructor(props) {
		super(props)

		const bundle = props.location.state

		const opponentStartCards = Array.from({ length: 13 }, () => (
			<Card flip={true} />
		))
		this.state = {
			cards: bundle.hand,
			acrossCards: opponentStartCards.slice(),
			leftCards: opponentStartCards.slice(),
			rightCards: opponentStartCards.slice()
		}
	}
	render() {
		const cards = this.state.cards
			? this.state.cards.map(c => {
					return (
						<Card
							key={c.suit + ' ' + c.number}
							suit={c.suit}
							number={c.number}
						/>
					)
			  })
			: null
		return (
			<div className="wrapper game">
				<div className="myCards">{cards}</div>
				<div className="leftCards">{this.state.leftCards}</div>
				<div className="rightCards">{this.state.rightCards}</div>
				<div className="acrossCards">{this.state.acrossCards}</div>
			</div>
		)
	}
}
