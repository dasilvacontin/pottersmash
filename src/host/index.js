/* eslint-disable no-debugger */
window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
const Phaser = window.Phaser = require('phaser/build/custom/phaser-split')

const game = new Phaser.Game(
  window.innerWidth,
  window.innerHeight,
  Phaser.CANVAS,
  'pottergame',
  { preload, create, update, render }
)

let playerGroup, cursors, keys, bulletGroup
let players, bullets
// let fire = false
// let fireKey
let nextFire
const FIRERATE = 100

function preload () {
  // asset loading stuff goes here
  game.load.image('wizard', 'images/wizardSmall.png')
  game.load.image('bullet5', 'images/bullet.png')
}

function create () {
  game.stage.backgroundColor = '#9f6015'

  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.physics.arcade.gravity.y = 0
  game.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP

  playerGroup = game.add.group()
  playerGroup.enableBody = true
  playerGroup.physicsBodyType = Phaser.Physics.ARCADE

  players = []
  for (let i = 0; i < 4; ++i) {
    const player = playerGroup.create(
      Math.floor(Math.random() * window.innerWidth),
      Math.floor(Math.random() * window.innerHeight),
      'wizard'
    )
    player.anchor.x = 0.5
    player.body.setSize(100, 100, 0, 0)
    player.body.bounce.setTo(0.8, 0.8)
    player.body.collideWorldBounds = true
    players.push(player)
  }

  bullets = []
  bulletGroup = game.add.group()
  bulletGroup.enableBody = true
  bulletGroup.physicsBodyType = Phaser.Physics.ARCADE

  cursors = game.input.keyboard.createCursorKeys()
  keys = {
    up: game.input.keyboard.addKey(Phaser.KeyCode.W),
    left: game.input.keyboard.addKey(Phaser.KeyCode.A),
    down: game.input.keyboard.addKey(Phaser.KeyCode.S),
    right: game.input.keyboard.addKey(Phaser.KeyCode.D)
  }
  game.input.gamepad.start()

  nextFire = game.time.now + FIRERATE

  // fireKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
  // cursors.isUp.add(function () {
    // fire = true
  // })
}

const SPEED = 200
const FSPEED = 200

function update () {
  game.physics.arcade.collide(playerGroup)
  game.physics.arcade.collide(playerGroup, bulletGroup, bulletCollided)

  const player = players[0]
  player.body.velocity.x = SPEED * Number(keys.right.isDown) - SPEED * Number(keys.left.isDown)
  player.body.velocity.y = SPEED * Number(keys.down.isDown) - SPEED * Number(keys.up.isDown)

  if (game.time.now > nextFire) {
    let fx = Number(cursors.right.isDown) - Number(cursors.left.isDown)
    let fy = Number(cursors.down.isDown) - Number(cursors.up.isDown)
    if (fx !== 0 || fy !== 0) {
      fireBullet(player, fx, fy)
      nextFire = game.time.now + FIRERATE
    }
  }
}

function fireBullet (player, x, y) {
  const bullet = bulletGroup.create(
    player.x + 50 * x, player.y + 50 + (y < 0 ? 60 : 50) * y,
    'bullet5'
  )
  // bullet.anchor.x = 0.5
  bullet.body.setSize(10, 10, 0, 0)
  bullet.body.collideWorldBounds = true
  bullet.body.velocity.y = FSPEED * y
  bullet.body.velocity.x = FSPEED * x
  bullets.push(bullet)
}

function bulletCollided (player, bullet) {
  playerGroup.remove(player, true)
  bulletGroup.remove(bullet, true)
  console.log('Bullet collided with ' + player)
}

function render () {
  players.forEach(player => game.debug.body(player))
  bullets.forEach(bullet => game.debug.body(bullet))
}

function resize () {
  game.scale.setGameSize(window.innerWidth, window.innerHeight)
  game.scale.refresh()
}

window.onresize = resize
