let loop;
let sample;
let sixteenth = 0;
let loopInterval = 1;
let majorArpeggio = [0, 4, 11, 7];
let root = 60;

// let scale = "major";

function preload() {
  sample = loadSound("https://cp7595a.github.io/computational-art-spring2024/assignments/08_sound/samples/piano.mp3");
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
  background(0, 0, 100);
  

  synth = new p5.PolySynth();
  loop = new p5.SoundLoop(soundLoop, loopInterval/.5);
}

function draw() {
  background(0, 0, 100);
  

}

function soundLoop(timeFromNow) {
  if (sixteenth % 8 === 0) {
    if (root === 48) {
      root += 5;
    } else {
      root -= 5;
    }
  }
  sample.play(timeFromNow)

  let arpIndex = sixteenth % majorArpeggio.length;
  let note = midiToFreq(root + majorArpeggio[arpIndex]);
  synth.play(note, 0.8, timeFromNow, 0.8);

  sixteenth++;
}

function mousePressed() {
  userStartAudio();

  // loop.start(); 
}