import io from 'socket.io-client'

const URL = 'https://hearts-api.terranceli.com'
// const URL = 'http://localhost:3000'

const Socket = io(URL)

export default Socket
