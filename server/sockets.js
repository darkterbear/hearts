const Deck = require('./cards').Deck
const CardSuit = require('./cards').CardSuit

/**
 * User schema
 *
 * 'id': {
 *    name: String,
 *    room: String,
 *    voted: Boolean
 * }
 */
var users = {}

/**
 * A dictionary of pending setTimeout handlers for disconnecting users
 */
var disconnects = {}

/**
 * Room schema
 *
 * 'id': {
 *    members: [id],
 *    open: Boolean,
 *    moveCount: Number, (-1 for haven't started)
 *    heartsBroken: Boolean,
 * 		turn: -1,
 * 		trick: []
 * }
 */
var rooms = {}

const hat = length => {
	var text = ''
	var possible = 'abcdef0123456789'

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length))

	return text
}

module.exports = server => {
	const io = require('socket.io')(server)

	const updatePlayers = roomId => {
		io.to(roomId).emit(
			'updatePlayers',
			rooms[roomId].members.map(m => {
				var u = { ...users[m] }
				u.id = m
				return u
			})
		)
	}

	io.on('connection', socket => {
		// autoassign id
		var id = hat(8)
		while (Object.keys(users).includes(id)) {
			id = hat(8)
		}

		// send id to client
		socket.emit('id', id)
		socket.join(id)

		// handle setName from client
		socket.on('setName', name => {
			if (users[id]) return

			users[id] = {
				name,
				room: null,
				voted: false
			}
		})

		socket.on('createRoom', () => {
			if (users[id].room) return

			// autoassign roomId
			var roomId = hat(6)
			while (Object.keys(rooms).includes(roomId)) {
				roomId = hat(6)
			}

			rooms[roomId] = { members: [id], open: true, moveCount: -1, heartsBroken: false, turn: 0, trick: [] }
			users[id].room = roomId

			socket.emit('roomId', roomId)
			socket.join(roomId)
		})

		socket.on('joinRoom', roomId => {
			if (
				users[id].room ||
				!rooms[roomId] ||
				rooms[roomId].members.length >= 4 ||
				!rooms[roomId].open
			)
				return

			rooms[roomId].members.push(id)
			socket.join(roomId)
			users[id].room = roomId

			// push new players to entire group
			updatePlayers(roomId)
		})

		socket.on('leaveRoom', () => {
			if (!users[id].room) return

			const roomId = users[id].room
			const room = rooms[roomId]
			socket.leave(roomId)

			if (room.members.length <= 1) {
				delete rooms[roomId]
				users[id].room = null
			} else {
				room.members.splice(room.members.indexOf(id), 1)
				users[id].room = null
				updatePlayers(roomId)
			}
		})

		socket.on('voteStart', () => {
			if (!users[id].room) return

			users[id].voted = true
			updatePlayers(users[id].room)

			// check if game is ready to start
			const roomId = users[id].room
			const room = rooms[roomId]
			if (room.members.length < 4) return
			for (var i = 0; i < room.members.length; i++) {
				var member = users[room.members[i]]
				if (!member.voted) return
			}

			// game is ready to start
			// close the room
			room.open = false
			room.moveCount = 0

			// deal the cards
			const hands = new Deck().deal()

			room.members.forEach((m, i) => {
				m.cards = hands[i].cards
				
				io.to(m).emit('startGame', hands[i])

				// check to see if cards contain the 2 of clubs; player with 2 of clubs starts
				if (m.cards.filter(m => m.number === 2 && m.suit === CardSuit.CLUBS).length > 0) {
					room.turn = i
					io.to(m).emit('yourTurn')
				}
			})
		})

		socket.on('disconnect', () => {
			const handler = setTimeout(() => {
				if (!users[id] || !users[id].room) return

				const roomId = users[id].room
				const room = rooms[roomId]
				socket.leave(roomId)
				if (room.members.length <= 1) {
					delete rooms[roomId]
				} else {
					room.members.splice(room.members.indexOf(id), 1)
					updatePlayers(roomId)
				}
				delete users[id]
			}, 3000)

			disconnects[id] = handler
		})

		// GAME MECHANICS
		socket.on('playCard', card => {
			const roomId = users[id].room
			const room = rooms[roomId]

			// return if game hasn't started
			if (!room.moveCount < 0) return

			// check user's turn
			if (room.turn !== room.members.indexOf(id)) return

			// check user actually has the card

			// only allow 2 of clubs on first move

			// only allow same suit (if this is not first card of trick)

			// remove card from player

			// check if hearts break

			// increment move

			// make next player's turn
		})
	})
}
