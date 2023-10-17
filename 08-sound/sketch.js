// Images and Sounds Demo

let mario;
let coinSound;
let backgroundSound;

function preload() {
  mario = loadImage("mario.png");
  coinSound = loadSound("coin-sound.wav");
  backgroundSound = loadSound("background-sound.mp3");

  backgroundSound.setVolume(0.5);
  coinSound.setVolume(1.0);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);

  image(mario, mouseX, mouseY, width/2, height/2);
}

function mousePressed() {
  coinSound.play();

  if (!backgroundSound.isPlaying()) {
    backgroundSound.loop();
  }
}