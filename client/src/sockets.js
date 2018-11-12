import io from 'socket.io-client'

const URL = 'http://localhost:3001'

const Socket = io(URL)

export default Socket
