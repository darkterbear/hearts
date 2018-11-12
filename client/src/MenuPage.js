import React, { Component } from 'react'
import { Logo, Button } from './Components'

export default class MenuPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: ''
		}
	}

	handleNameChange = e => {
		this.setState({ name: e.target.value })
	}

	render() {
		return (
			<div className="wrapper">
				<div className="center">
					<h1>what's your name?</h1>
					<input
						placeholder="type it here :)"
						onChange={this.handleNameChange}
					/>
					<div className="buttonWrapper">
						<Button text="create room" onClick={this.handleCreateRoom} />
						<Button text="join room" onClick={this.handleJoinRoom} />
					</div>
				</div>
				<Logo />
			</div>
		)
	}
}
