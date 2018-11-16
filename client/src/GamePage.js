import React, { Component } from 'react'
import Card from './Card'
import Socket from './sockets'

export default class GamePage extends Component {
	constructor(props) {
		super(props)

		const bundle = props.location.state

		const opponentStartCards = Array.from({ length: 13 }, (_, i) => (
			<Card key={i} flip={true} />
		))
		this.state = {
			cards: bundle.hand,
			id: bundle.id,
			roomId: bundle.roomId,
			players: bundle.players,
			acrossCards: opponentStartCards.slice(),
			leftCards: opponentStartCards.slice(),
			rightCards: opponentStartCards.slice(),
			myTurn: false
		}

		Socket.on('yourTurn', () => {
			console.log('your turn!')
			this.setState({ myTurn: true })
		})

		Socket.on('turnEnd', () => {
			console.log('your turn ended')
			this.setState({ myTurn: false })
		})

		Socket.on('cardPlayed', (card, player) => {
			if (player === this.state.id) {
				// player is meeee
			} else {
				// player is not meeee
			}
		})
	}

	onCardSelect(card) {
		console.log('card selected: ' + card.suit + ' ' + card.number)
		Socket.emit('playCard', card)
	}

	render() {
		const cards = this.state.cards
			? this.state.cards.map(c => {
					return (
						<Card
							key={c.suit + ' ' + c.number}
							suit={c.suit}
							number={c.number}
							onClick={() => this.onCardSelect(c)}
						/>
					)
			  })
			: null
		return (
			<div className="wrapper game">
				<div className="myCards">
					{this.state.myTurn && <h2 className="message">your turn!</h2>}
					{cards}
				</div>
				<div className="leftCards">{this.state.leftCards}</div>
				<div className="rightCards">{this.state.rightCards}</div>
				<div className="acrossCards">{this.state.acrossCards}</div>
			</div>
		)
	}
}
