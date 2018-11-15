import React, { Component } from 'react'

export default class Card extends Component {
	render() {
		if (this.props.flip) {
			return <object className="card" data={'/assets/cards/cardback.svg'} />
		}
		const suit = (n => {
			switch (n) {
				case 0:
					return 'h'
				case 1:
					return 's'
				case 2:
					return 'c'
				case 3:
					return 'd'
			}
		})(this.props.suit)
		const number =
			this.props.number < 10
				? '0' + this.props.number
				: this.props.number.toString()
		return (
			<object
				className="card"
				data={'/assets/cards/' + suit + number + '.svg'}
			/>
		)
	}
}
