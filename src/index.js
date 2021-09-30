import Phaser from "phaser";

const config = {
  // WebGL 
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics -- > manages physics simulation
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        // y: 400
      }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

const VELOCITY_X = 20;
const VELOCITY_Y = 200;

const FLAP_VELOCITY = 175;

const INITIAL_PLAYER_POSITION = { x: config.width / 10, y: config.height / 2 };
const PIPE_VERTICCALDISTANCE_RANGE = [150, 250];

let player = null;

let upperPipe = null;
let lowerPipe = null;

let pipeVerticalDistance = Phaser.Math.Between(...PIPE_VERTICCALDISTANCE_RANGE);
// todo: try to resolve this --> calc not possible in Between()!!
let tmp = [0 + 20, config.height - 20 - pipeVerticalDistance];

let pipeVerticalPosition = 0; pipeVerticalPosition = Phaser.Math.Between(...tmp);

let totalDelta = null;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);
  // call it on the physics object - so the bird has a body
  player = this.physics.add.sprite(INITIAL_PLAYER_POSITION.x, INITIAL_PLAYER_POSITION.y, 'bird').setOrigin();
  player.body.gravity.y = 400;

  upperPipe = this.physics.add.sprite(400, pipeVerticalPosition, 'pipe').setOrigin(0, 1);
  lowerPipe = this.physics.add.sprite(400, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0, 0);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}


//
function update(time, delta) {
  if (player.y > config.height || player.y < -player.height) {
    resetPlayerPosition();
  }
}

function resetPlayerPosition() {
  player.x = INITIAL_PLAYER_POSITION.x;
  player.y = INITIAL_PLAYER_POSITION.y;
  player.body.velocity.y = 0;
}

function flap() {
  player.body.velocity.y = -FLAP_VELOCITY;
  player.body.velocity.x = VELOCITY_X;
}

new Phaser.Game(config);
