const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

// socket.io stuff
io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('input-update', function (inputData) {
    console.log(inputData)
  })
})

// serve static assets
app.use(express.static(path.join(__dirname, '..', '..', 'public')))

// Define the port to run on
const PORT = process.env.PORT || 3000

// Listen for requests
http.listen(PORT, function () {
  console.log('Magic happens on port ' + PORT)
})
