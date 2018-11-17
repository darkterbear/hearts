import io from 'socket.io-client'

const URL = 'https://hearts.terranceli.com'

const Socket = io(URL)

export default Socket
