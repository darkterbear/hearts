import io from 'socket.io-client'

const URL = 'https://hearts-api.terranceli.com'

const Socket = io(URL)

export default Socket
