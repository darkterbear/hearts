import io from 'socket.io-client'

const URL = 'http://192.168.0.109:3001'

const Socket = io(URL)

export default Socket
