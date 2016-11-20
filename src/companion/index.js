/* globals screen Element */
// companion main file

const { Joystick } = require('./joystick.js')
var canvas = document.getElementById('player-controller')
console.log('Im the companion app!')

const elements = [
  new Joystick(0, 0),
  new Joystick(0, 0)
]

function updateJoysticks () {
  var ctx = canvas.getContext('2d')
  var radius = canvas.height * 0.30

  let centerx, centery
  centerx = canvas.width - (canvas.width / 4)
  centery = canvas.height / 2
  ctx.beginPath()
  ctx.arc(centerx, centery, radius, 0, 2 * Math.PI)
  ctx.stroke()
  elements[0].updateCenter(centerx, centery)

  centerx = canvas.width / 4
  centery = canvas.height / 2
  ctx.beginPath()
  ctx.arc(centerx, centery, radius, 0, 2 * Math.PI)
  ctx.stroke()
  elements[1].updateCenter(centerx, centery)
}

function resized () {
  // setTimeout since Safari doesn't update window.orientation before firing the resize event
  setTimeout(function () {
    // Setup canvas size
    let orientation = screen.orientation || screen.mozOrientation || screen.msOrientation
    if (orientation == null) {
      orientation = Math.abs(window.orientation) === 90
        ? { type: 'landscape-primary' }
        : { type: 'portrait' }
    }
    console.log(orientation)
    if (orientation.type === 'landscape-primary' || orientation.type === 'landscape-secondary') {
      window.onclick = function () {
        requestFullscreen(document.getElementById('controllers'))
      }
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      console.log(window.innerWidth, window.innerHeight)
      updateJoysticks(canvas)
    }
  }, 1)
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

resized()

window.addEventListener('touchstart', touchStart)
window.addEventListener('touchmove', touchMove)
window.addEventListener('touchend', touchEnd)

const touchToElement = {}

function touchIsAssigned (touch) {
  return Boolean(touchToElement[touch.identifier])
}

function touchStart (e) {
  const touches = Array.from(e.changedTouches)
  const unassignedTouches = touches.filter(touch => !touchIsAssigned(touch))

  for (let touch of unassignedTouches) {
    let closestElement = null
    let minDistance = Infinity
    for (let element of elements) {
      let distance = element.distanceToTouch(touch)
      if (distance < minDistance) {
        minDistance = distance
        closestElement = element
      }
    }
    if (!closestElement.hasTouchAssigned()) {
      closestElement.assignTouch(touch)
      touchToElement[touch.identifier] = closestElement
    }
  }

  touchMove(e)
  e.preventDefault()
}

function touchMove (e) {
  const touches = Array.from(e.changedTouches)
  for (let touch of touches) {
    const element = touchToElement[touch.identifier]
    if (!element) continue
    element.processTouchMove(touch)

    const ctx = canvas.getContext('2d')
    // debug
    ctx.beginPath()
    ctx.moveTo(element.centerx, element.centery)
    ctx.lineTo(touch.pageX, touch.pageY)
    ctx.stroke()
  }
  e.preventDefault()
}

function touchEnd (e) {
  const touches = Array.from(e.changedTouches)
  for (let touch of touches) {
    const element = touchToElement[touch.identifier]
    if (!element) continue
    delete touchToElement[touch.identifier]
    element.assignTouch(null)
  }
  e.preventDefault()
}
