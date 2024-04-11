let loop;
let sample;

function preload() {
  sample = loadSound("");
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
  background(0, 0, 100);
  

}

function draw() {
  background(0, 0, 100);
  

}

function soundLoop(timeFromNow) {
  sample.play(timeFromNow)
}

function mousePressed() {
  userStartAudio();

  loop = new p5.SoundLoop(soundLoop, loopInterval/4);
  loop.start(); 
}