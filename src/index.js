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
        y: 400
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

let bird = null;
let totalDelta = null;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);
  // call it on the physics object - so the bird has a body
  bird = this.physics.add.sprite(config.width / 10, config.height / 2, 'bird').setOrigin();

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}

function update(time, delta) {
}
function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY;
  bird.body.velocity.x = VELOCITY_X;
}

new Phaser.Game(config);
