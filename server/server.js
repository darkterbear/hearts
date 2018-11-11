'use strict'

const app = require('express')()
const port = 3000

const server = require('http').Server(app)

// attach socket.io api
require('./sockets')(server)

server.listen(port, () => {
	console.log('ERS API is live on port ' + port)
})
