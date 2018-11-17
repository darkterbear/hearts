'use strict'

const app = require('express')()
const port = 3001

const server = require('http').Server(app)

app.use((req, res, next) => {
	var allowedOrigins = [
		'http://localhost:3000',
		'https://hearts.terranceli.com'
	]
	var origin = req.headers.origin

	if (allowedOrigins.indexOf(origin) > -1) {
		res.setHeader('Access-Control-Allow-Origin', origin)
	}
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

// attach socket.io api
require('./sockets')(server)

server.listen(port, () => {
	console.log('Hearts API is live on port ' + port + '\n')
})
