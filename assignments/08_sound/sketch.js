
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

let mercuryAngle = 0;
let venusAngle = 0;
let earthAngle = 0;
let marsAngle = 0;
let jupiterAngle = 0;
let saturnAngle = 0;
let uranusAngle = 0;
let neptuneAngle = 0;


let eighth = 0;
let major = [0,2,4,5,7,9,11,12];
let base = 48; 
let count= 0;

let slider;
let speedSlider;

let starXpos = 100
let starYpos = 100

function preload() {
  // load sounds
  mercury = loadSound("./samples/NoteCMercury.mp3");
  venus = loadSound("./samples/NoteEVenus.mp3");
  earth = loadSound("./samples/NoteGEarth.mp3");
  mars = loadSound("./samples/NoteBMars.mp3");
  jupiter = loadSound("./samples/NoteDJupiter.mp3");
  saturn = loadSound("./samples/NoteE2Saturn.mp3");
  uranus = loadSound("./samples/NoteG2Uranus.mp3");
  neptune = loadSound("./samples/NoteB2Neptune.mp3");
  starSound = loadSound("./samples/chimes.mp3");
  // twinkleSound = loadSound("./samples/twinkle.mp3");

  // load pics
  space = loadImage("./pics/space.jpg");
  star = loadImage("./pics/star.png");
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
  
  slider = createSlider(0, 16, 0); 
  slider.position(10, height + 10);
  
  synth = new p5.PolySynth();
  loop = new p5.SoundLoop(soundLoop, loopInterval/2);
  drawCircle(width/2, height/2, 1100, 0);
  
  textSize(100);
  fill(0, 0, 100);
  text('Select:', slider.x + slider.width + 10, slider.y);
}

function draw() {
  background(space);

  image(star, starXpos - 100, starYpos- 100, 250, 150); 

  //initializing X and Y positions
  let mercuryX = width / 2 + 50 * cos(mercuryAngle); // cos for X and sin for Y because if not the planets go counter-clockwise
  let mercuryY = height / 2 + 50 * sin(mercuryAngle);
  let venusX = width / 2 + 75 * cos(venusAngle);
  let venusY = height / 2 + 75 * sin(venusAngle);
  let earthX = width / 2 + 100 * cos(earthAngle); 
  let earthY = height / 2 + 100 * sin(earthAngle);
  let marsX = width / 2 + 130 * cos(marsAngle); 
  let marsY = height / 2 + 130 * sin(marsAngle);
  let jupiterX = width / 2 + 235 * cos(jupiterAngle); 
  let jupiterY = height / 2 + 225* sin(jupiterAngle);
  let saturnX = width / 2 + 315 * cos(saturnAngle);  // changing the number added by to account for the entire rotation
  let saturnY = height / 2 + 315 * sin(saturnAngle);
  let uranusX = width / 2 + 415 * cos(uranusAngle); 
  let uranusY = height / 2 + 415 * sin(uranusAngle);
  let neptuneX = width / 2 + 550 * cos(neptuneAngle); 
  let neptuneY = height / 2 + 550 * sin(neptuneAngle);

  let angleChange = 1; //starting number bc I didn't know what to make it besides one
  mercuryAngle += angleChange * 0.02; 
  venusAngle += angleChange * 0.015; // make the planets slower as they get further from the sun
  earthAngle += angleChange * 0.01; 
  marsAngle += angleChange * 0.008; 
  jupiterAngle += angleChange * 0.003; //super slow
  saturnAngle += angleChange  * 0.002;   
  uranusAngle += angleChange * 0.0015; // had to leave space for .001 oops
  neptuneAngle += angleChange * 0.001; 

  // Draw planets
  image(mercuryPic, mercuryX - 10, mercuryY - 10, 25, 15);
  image(venusPic, venusX - 20, venusY  - 20, 45, 25);
  image(earthPic, earthX - 10,  earthY - 15, 30, 30);
  image(marsPic, marsX - 10, marsY - 15, 25, 25);
  image(jupiterPic, jupiterX - 30, jupiterY - 20, 80, 50);
  image(saturnPic, saturnX - 30, saturnY - 30, 70, 60);
  image(uranusPic, uranusX - 20, uranusY - 25, 35, 50);
  image(neptunePic, neptuneX - 10, neptuneY - 25, 25, 25);

  drawCircle(width/2 + 2, height/2 - 2, 1100, 0);


  image(asteriodbelt, 250, 125, 725, 725);
}

function drawCircle(x, y, w, orbit) { //created
  // noFill(); 

  if (orbit === 9) { //draw sun no movement (9 is last drawn so)
    noStroke();
    noFill(); 
    image(sun, x - 40, y - 35, w + 10, w - 10)
    console.log(x, y)} else {
    noFill();
    stroke(0, 0, 100, 0.3);
    
  }

  ellipse(x, y, w);

  count++;

  w *= 0.75; // big space between

  if (orbit >= 9) { //code to make it stop after 9 circles (started with 9)
    return;
  }

  drawCircle(x, y, w, orbit + 1);

}

function soundLoop(timeFromNow) {
  if (eighth % 8 === 0) {
    if (base === 48) {
      base += 7;
    } else {
      base -= 7; // base by 7 and plus 7 makes a nice wrap over
    }
  }

  //slider behaviors
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
  let index = eighth %  major.length; // using major scale
  let note = midiToFreq(base + major[index]);
  synth.play(note, 0.2, timeFromNow, 0.2); //sun synth :)
  
  eighth = eighth + 4; //increment by 4 to limit notes heard

}


function mousePressed() {
  userStartAudio();

  loop.start(); 

  if (mouseX > starXpos - 100 && mouseX < starXpos + 100 &&
    mouseY > starYpos - 100 && mouseY < starYpos + 100) {
      starSound.play();
      starXpos = random(50, 1000)
      starYpos = random(50, 1000)
    }

}
