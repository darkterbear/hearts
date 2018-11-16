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
			this.setState({ myTurn: true })
		})

		Socket.on('turnEnd', () => {
			this.setState({ myTurn: false })
		})

		Socket.on('cardPlayed', (card, player) => {
			if (player === this.state.id) {
				// player is meeee
				// remove card from state.cards
				this.setState({
					cards: this.state.cards
						.slice()
						.filter(c => !(c.suit === card.suit && c.number === card.number))
				})
			} else {
				// player is not meeee

				const playerIds = this.state.players.map(p => p.id)
				const myIndex = playerIds.indexOf(this.state.id)
				const playerIndex = playerIds.indexOf(player)
				console.log(myIndex + ' ' + playerIndex)

				var normalizedPlayerIndex = playerIndex + (4 - myIndex)
				if (normalizedPlayerIndex > 3) normalizedPlayerIndex -= 4

				console.log(normalizedPlayerIndex)

				switch (normalizedPlayerIndex) {
					case 1:
						this.setState({
							leftCards: this.state.leftCards
								.slice()
								.splice(0, this.state.leftCards.length - 1)
						})
						break
					case 2:
						this.setState({
							acrossCards: this.state.acrossCards
								.slice()
								.splice(0, this.state.acrossCards.length - 1)
						})
						break
					case 3:
						this.setState({
							rightCards: this.state.rightCards
								.slice()
								.splice(0, this.state.rightCards.length - 1)
						})
						break
				}
			}
		})
	}

	onCardSelect(card) {
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
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<img className="leftCard" src={'/assets/cards/cardback.svg'} />
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<img className="acrossCard" src={'/assets/cards/cardback.svg'} />
						<img className="myCard" src={'/assets/cards/cardback.svg'} />
					</div>
					<img className="rightCard" src={'/assets/cards/cardback.svg'} />
				</div>
			</div>
		)
	}
}
