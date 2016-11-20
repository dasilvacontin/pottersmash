export class Joystick {
  constructor (centerx, centery) {
    this.updateCenter(centerx, centery)
    this.assignTouch(null)
    this.data = [0, 0]
  }

  updateCenter (centerx, centery) {
    this.centerx = centerx
    this.centery = centery
  }

  assignTouch (touch) {
    this.assignedTouch = touch ? touch.identifier : null
    if (this.assignedTouch == null) this.data = [0, 0]
  }

  hasTouchAssigned () {
    return Boolean(this.assignedTouch)
  }

  distanceToTouch (touch) {
    return Math.abs(touch.pageX - this.centerx) + Math.abs(touch.pageY - this.centery)
  }

  processTouchMove (touch) {
    const dx = touch.pageX - this.centerx
    const dy = touch.pageY - this.centery

    let theta = Math.atan2(dy, dx)
    theta *= 180 / Math.PI
    if (theta < 0) theta += 360

    const exceed = theta % 45
    let angle = exceed < 22.5
      ? theta - exceed
      : theta + 45 - exceed
    if (angle === 360) angle = 0

    switch (angle) {
      case 0:
        this.data = [1, 0]
        break

      case 45:
        this.data = [1, -1]
        break

      case 90:
        this.data = [0, -1]
        break

      case 135:
        this.data = [-1, -1]
        break

      case 180:
        this.data = [-1, 0]
        break

      case 225:
        this.data = [-1, 1]
        break

      case 270:
        this.data = [0, 1]
        break

      case 315:
        this.data = [1, 1]
        break
    }
  }
}
