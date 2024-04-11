let prevTimeStamp;

let kickSample;

let synth;
let loop;

let note = 0;

let sixteenth = 0;

let scale = "dorian";

let loopInterval = 1; // Loop interval of 1 second corresponds to 60 BPM

function preload() {
  kickSample = loadSound("https://mtreanor.com/computational-art-spring2024/examples/4-4-24/samples/kick.wav");
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
  
  // frameRate(5);

  lastTime = millis();
}

function draw() {
  background(0, 0, 100);

  let deltaTime = millis() - prevTimeStamp;
  // console.log(deltaTime);

  prevTimeStamp = millis();
}

function soundLoop(timeFromNow) {
  if (sixteenth % 4 === 0) {
    kickSample.play(timeFromNow);
  }

  note = floor(random(0, scales[scale].length));

  if (random() < 0.5) {
    synth.play(midiToFreq(60 + scales[scale][note]), random(0.1, 0.9), timeFromNow, random(0.1, 0.4));
    if (random() < 0.2) {
      synth.play(midiToFreq(60 + scales[scale][note] + 3), random(0.1, 0.9), timeFromNow, random(0.1, 0.4));
    }
  }
  note++;
  note = note % 8;

  sixteenth++;
}

function mousePressed() {
  userStartAudio();

  synth = new p5.PolySynth();

  loop = new p5.SoundLoop(soundLoop, loopInterval/4);

  loop.start(); 
}