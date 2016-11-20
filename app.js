const express = require('express')
const path = require('path')
const app = express()

// Define the port to run on
const PORT = process.env.PORT || 3000
app.set('port', PORT)

app.use(express.static(path.join(__dirname, 'public')))

// Listen for requests
var server = app.listen(app.get('port'), function () {
  var port = server.address().port
  console.log('Magic happens on port ' + port)
})
