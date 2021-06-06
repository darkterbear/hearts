# Hearts
An online room-based card game: Hearts

# Getting Started

## Prereqs

- Node.js: `10.3.0`
- NPM: `6.4.0`

## Setup

Clone this repository...
```
git clone git@github.com:darkterbear/hearts
cd hearts/
```

Install server dependencies and start the server
```
cd ./server
npm i
npm start
```

Install client dependencies and start React app
```
cd ./client
npm i
npm start
```

The client `./src/sockets.js` contains the URL for the server. It is set to `localhost:3001` by default, and the server runs on port 3001. However, if you are hosting the server elsewhere, change the `const URL` in `./src/sockets.js` to the hostname and port of your host.

# Built With
- Express.js
- React
- Socket.io and Socket.io Client

# Author
- Terrance Li - _initial work_

# License
This project is licensed under the MIT License - see the LICENSE.md file for details
