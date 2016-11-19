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

let playerGroup, cursors
let players

function preload () {
  // asset loading stuff goes here
  game.load.image('wizard', 'images/wizardSmall.png')
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

  cursors = game.input.keyboard.createCursorKeys()
  game.input.gamepad.start()
}

const SPEED = 200
function update () {
  game.physics.arcade.collide(playerGroup)

  const player = players[0]
  player.body.velocity.x = SPEED * Number(cursors.right.isDown) - SPEED * Number(cursors.left.isDown)
  player.body.velocity.y = SPEED * Number(cursors.down.isDown) - SPEED * Number(cursors.up.isDown)
}

function render () {
  players.forEach(player => game.debug.body(player))
}
