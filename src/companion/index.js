/* globals screen Element */
// companion main file
console.log('Im the companion app!')

function drawCircles (canvas) {
  var ctx = canvas.getContext('2d')
  var radius = canvas.height * 0.30

  ctx.beginPath()
  ctx.arc(canvas.width - (canvas.width / 4), canvas.height / 2, radius, 0, 2 * Math.PI)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(canvas.width / 4, canvas.height / 2, radius, 0, 2 * Math.PI)
  ctx.stroke()
}

function resized () {
  // Setup canvas size
  console.log(screen.orientation)
  var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation
  if (orientation.type === 'landscape-primary' || orientation.type === 'landscape-secondary') {
    window.onclick = function () {
      requestFullscreen(document.getElementById('controllers'))
    }
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drawCircles(canvas)
  }
}

function requestFullscreen (element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
  }
}

window.onresize = resized
// requestFullscreen(window.document.documentElement)

var canvas = document.getElementById('player-controller')
resized()
