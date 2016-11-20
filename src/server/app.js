const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

// socket that hosts the game
let host = null

function onHostGame () {
  const socket = this
  if (host == null) {
    host = socket
    console.log(`${socket.client.id} began hosting the game`)
    host.on('promote-players', (players) => {
      host.broadcast.emit('promote-players', players)
    })
  } else {
    console.log('yolo: someone tried to host a game while it was already being hosted by someone')
  }
}

function onPlayerJoin (house) {
  const socket = this
  if (!host) return console.log('yolo2: player tried to join when no one was hosting')
  host.emit('player-join', socket.client.id, house)
}

function onInputUpdate (inputData) {
  const socket = this
  console.log(`${socket.client.id} send input-data`, inputData)
  host.emit('input-update', socket.client.id, inputData)
}

// socket.io stuff
io.on('connection', function (socket) {
  console.log('a user connected')

  socket.on('host-game', onHostGame)
  socket.on('player-join', onPlayerJoin)
  socket.on('input-update', onInputUpdate)
})

// serve static assets
app.use(express.static(path.join(__dirname, '..', '..', 'public')))

// Define the port to run on
const PORT = process.env.PORT || 3000

// Listen for requests
http.listen(PORT, function () {
  console.log('Magic happens on port ' + PORT)
})
