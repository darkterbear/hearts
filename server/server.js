'use strict'

const app = require('express')()
const port = 3001

const server = require('http').Server(app)

// attach socket.io api
require('./sockets')(server)

server.listen(port, () => {
	console.log('Hearts API is live on port ' + port + '\n')
})
