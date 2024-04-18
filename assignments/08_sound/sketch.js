
let loop;
let loopInterval = 1;
let timeFromNow = 1;

let mercury;
let venus;
let earth;
let mars;
let jupiter;
let saturn;
let uranus;
let neptune;

let mercuryRotation = 0;

let eighth = 0;
let major = [0,2,4,5,7,9,11,12];
let root = 48; 
let count= 0;

let slider;

let starXpos = 200
let starYpos = 200

function preload() {
  mercury = loadSound("./samples/NoteCMercury.mp3");
  venus = loadSound("./samples/NoteEVenus.mp3");
  earth = loadSound("./samples/NoteGEarth.mp3");
  mars = loadSound("./samples/NoteBMars.mp3");
  jupiter = loadSound("./samples/NoteDJupiter.mp3");
  saturn = loadSound("./samples/NoteE2Saturn.mp3");
  uranus = loadSound("./samples/NoteG2Uranus.mp3");
  neptune = loadSound("./samples/NoteB2Neptune.mp3");
  starSound = loadSound("./samples/twinkle.mp3");

  space = loadImage("./pics/space.jpg");
  // star = loadImage("./pics/star.png");
  asteriodbelt = loadImage("./pics/asteroidbelt.png");
  sun = loadImage("./pics/sun.png");
  mercuryPic = loadImage("./pics/mercury.png");
  venusPic = loadImage("./pics/venus.png");
  earthPic = loadImage("./pics/earth.png");
  marsPic = loadImage("./pics/mars.png");
  saturnPic = loadImage("./pics/saturn.png");
  jupiterPic = loadImage("./pics/jupiter.png");
  uranusPic = loadImage("./pics/uranus.png");
  neptunePic = loadImage("./pics/neptune.png");
}

function setup() {
  createCanvas(1200, 1000);
  colorMode(HSB);
  background(space);
  
  drawCircle(width/2, height/2, 950, 0);
 
  slider = createSlider(0, 16, 0); 
  slider.position(10, height + 10);
  
  synth = new p5.PolySynth();
  loop = new p5.SoundLoop(soundLoop, loopInterval/2);
  
  console.log()
}

function draw() {
  image(asteriodbelt, 380, 270, 450, 450);

  image(star, starXpos - 100, starYpos - 100, 200, 200);
  console.log(starXpos, starYpos)

}

function drawCircle(x, y, w, orbit) { //created
  // noFill(); 
  if (orbit === 9) { // smallest circle should be the last one
    noStroke();
    noFill(); // sun :)
    image(sun, x - 35, y - 30, w + 5, w - 10)
  }if (orbit === 8) { // smallest circle should be the last one
    push();
    image(mercuryPic, x - 45, y, 25, 15)
    pop();
  }if (orbit === 7) { 
    image(venusPic, x + 10, y + 10, w - 90, w - 105)
  }if (orbit === 6) { 
    image(earthPic, x, y - 70, w-145, w-145)
  }if (orbit === 5) { 
    image(marsPic, x - 55, y - 80, w-205, w-205)
  }if (orbit === 4) { 
    image(jupiterPic, x + 105, y- 150 + 150, w-225, w-350)
  }if (orbit === 3) { 
    image(saturnPic, x + 150, y, w-300, w-460)
  }if (orbit === 2) { 
    image(neptunePic, x + 335, y - 70, w - 500, w - 500)
  }if (orbit === 1) { 
    image(uranusPic, x + 245, y - 70, w - 675, w - 650)
  }else {
    noFill();
    stroke(0, 0, 100, 0.3);
    
  }

  ellipse(x, y, w);

  count++;

  w *= 0.75; // make them bigger

  if (orbit >= 9) { //code to make it stop after 8 circles
    return;
  }

  drawCircle(x, y, w, orbit + 1); 

}

function soundLoop(timeFromNow) {
  if (eighth % 8 === 0) {
    if (root === 48) {
      root += 7;
    } else {
      root -= 7;
    }
  }

  if (slider.value() !== 0){

    if (slider.value() < 9){
    mercury.play(timeFromNow);
  }
   if (slider.value() !== 1 && slider.value() < 10){
    venus.play(timeFromNow);
  }
    if (slider.value() > 2 && slider.value() < 11){
    earth.play(timeFromNow);
  }
    if (slider.value() > 3 && slider.value() < 12){
    mars.play(timeFromNow);
  }
    if (slider.value() > 4 && slider.value() < 13){
    jupiter.play(timeFromNow);
  }
    if (slider.value() > 5 && slider.value() < 14){
    saturn.play(timeFromNow);
  }
   if (slider.value() > 6 && slider.value() < 15){
    uranus.play(timeFromNow);
  }
    if (slider.value() > 7){
    neptune.play(timeFromNow);
  }
}
  let index = eighth %  major.length;
  let note = midiToFreq(root + major[index]);
  synth.play(note, 0.25, timeFromNow, 0.2);
  
  eighth = eighth + 4;

}


function mousePressed() {
  userStartAudio();

  loop.start(); 

  if (mouseX > starX - 100 && mouseX < starX + 100 &&
    mouseY > starY - 100 && mouseY < starY + 100) {
    star.play(timeFromNow);
  }

}
