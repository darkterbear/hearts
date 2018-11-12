import React, { Component } from 'react'
import { Logo, Button } from './Components'
import Socket from './sockets'

export default class MenuPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			id: ''
		}

		Socket.on('id', id => {
			this.setState({ id })
		})
		Socket.on('roomId', roomId => {
			// TODO: go to room lobby
		})
	}

	handleNameChange = e => {
		this.setState({ name: e.target.value })
	}

	handleCreateRoom = () => {
		Socket.emit('setName', this.state.name)
		Socket.emit('createRoom')
	}

	handleJoinRoom = () => {
		Socket.emit('setName', this.state.name)
		// TODO: go to room id input
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
						<Button
							enabled={this.state.name !== ''}
							text="create room"
							onClick={this.handleCreateRoom}
						/>
						<Button
							enabled={this.state.name !== ''}
							text="join room"
							onClick={this.handleJoinRoom}
						/>
					</div>
				</div>
				<Logo />
			</div>
		)
	}
}
