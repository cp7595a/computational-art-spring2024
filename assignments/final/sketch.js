
// 5+ interconnections between aspects of your system
// 3+ types of media other than primitive drawing function:
// images, audio/music, video, natural language processing/generation, web cams, or something else we haven’t covered such as 3D

// IDEA:
// The Sounds of the World!
// Start river/park
// Under the ocean 
// Space

let leftKeyPressed = false;
let rightKeyPressed = false;
let mercuryState = false;
let venusState = false;

let systems = [];
let puffers = [];
let flowField = [];
let fishes = [];

let health = 50; 

let numFishes = 25;
let numSystems = 10; 
let numCellsWidth = 20;
let numCellsHeight = 20;
let numPuffers = 1;

let loop;
let loopInterval = 1;
let timeFromNow = 1;

let eighth = 0;
let major = [0,2,4,5,7,9,11,12];
let base = 48; 
let count= 0;

let cellWidth;
let cellHeight;
let gravity;
let translateSlider;

let waterPlay = false;

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
  // starSound = loadSound("./samples/chimes.mp3");
  // twinkleSound = loadSound("./samples/twinkle.mp3");
  water = loadSound("./samples/water.mp3");
  // bubbles = loadSound("./samples/bubbles.mp3");

  // load pics
  space = loadImage("./pics/space.jpg");
  astronaut = loadImage("./pics/astronaut.png");
  mercuryPic = loadImage("./pics/mercury.png");
  venusPic = loadImage("./pics/venus.png");
  earthPic = loadImage("./pics/earth.png");
  marsPic = loadImage("./pics/mars.png");
  saturnPic = loadImage("./pics/saturn.png");
  jupiterPic = loadImage("./pics/jupiter.png");
  uranusPic = loadImage("./pics/uranus.png");
  neptunePic = loadImage("./pics/neptune.png");

  ocean = loadImage("./pics/ocean.png");
  crabby = loadImage("./pics/crab.png");
  dead_crab = loadImage("./pics/dead_crab.png");
  pirate = loadImage("./pics/pirate.png");
  pirate2 = loadImage("./pics/pirate2.png");
  carp = loadImage("./pics/carp.png")
  lionfish = loadImage("./pics/lionfish.png");
  blue = loadImage("./pics/bluediscus.png");
  salmon = loadImage("./pics/salmon.png")

  mtns = loadImage("./pics/mountains.png")
}


function setup() {
  createCanvas(1000, 600);

  colorMode(HSB);
  noStroke();

  translateSlider = createSlider(0, 2000, 2000, 50); 
  translateSlider.position(10, height + 85);


  cellWidth = width / numCellsWidth;
  cellHeight = 450 / numCellsHeight;

  let xoff = 0;
  let yoff = 0;
  let inc = 0.05;
  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    flowField[xIndex] = [];
    yoff = 0;
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      let angle = map(noise(xoff, yoff), 0, 1, 350 * PI/180, 2 * PI);
      flowField[xIndex][yIndex] = new Cell(angle, xIndex, yIndex);
    }
    yoff += inc;
    xoff += inc;
  }
  p2 = new Person(0, 500);
  crab = new Crab(random(200, 700), 500)

  target = crab.pos

  for(let i = 0; i < numFishes; i++) {
    type = floor(random(1, 4));
    fishes.push(new Fish(random(width), random(height), target, type));
  }


  gravity  = createVector(0, -0.1)
  for (let i = 0; i < numSystems; i++) {
    translate(1000 - translateSlider.value(), 0);
    systems.push(new ParticleSystem(random(100, width-200), 600, gravity));
  }

  synth = new p5.PolySynth();
  loop = new p5.SoundLoop(soundLoop, loopInterval/2);

}

function draw() {
  background(0, 0, 100);

  push();
  translate(2000 - translateSlider.value(), 0);
  image(space, 0, 0, 1200, 600);
  image(astronaut, 0, 0, 50, 90)

  image(mercuryPic, 100, 100, 50, 50)
  image(venusPic, 200, 200, 70, 70)
  image(earthPic, 300, 300, 70, 70)
  image(marsPic, 400, 400, 65, 65)
  image(jupiterPic, 500, 300, 105, 100)
  image(saturnPic, 600, 200, 100, 75 )
  image(uranusPic, 750, 100, 65, 65)
  image(neptunePic, 850, 50, 70, 70)


  pop();

  push();
  translate(1000 - translateSlider.value(), 0);

  image(ocean, 0, 0, 1000, 600)
  //Little shiny glimmers
  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      flowField[xIndex][yIndex].update();
      flowField[xIndex][yIndex].show();
    }
  }

  textSize(12);
  fill(100);
  text(health, crab.pos.x + 60, crab.pos.y - 20);
  fill(0, 100, 100);
  rect(crab.pos.x, crab.pos.y - 25, health, 5);

  

  crab.update();
  crab.show();


  for (let fish of fishes) {
    fish.update();
    fish.show();
  }


  p2.update()
  p2.show()
  
  if (leftKeyPressed) {
    p2.vel.x = -1;
  } else if (rightKeyPressed) {
    p2.vel.x = 1;
  } else {
    p2.vel.x = 0;
  }

  for (let ps of systems) {
    ps.update();
  }
  
  pop();

  push();
  translate(0 - translateSlider.value(), 0);
  image(mtns, 0, 0, 1000, 600)


  pop();

}

function positionToFlowFieldIndex(x, y) {
  translate(1000 - translateSlider.value(), 0);
  let xIndex = floor(map(x, 0, width, 0, numCellsWidth));
  xIndex = constrain(xIndex, 0, numCellsWidth-1);
  let yIndex = floor(map(y, 0, height, 0, numCellsHeight));
  yIndex = constrain(yIndex, 0, numCellsHeight-1);
  return createVector(xIndex, yIndex);
}

function soundLoop(timeFromNow) {
  push();

  if (eighth % 8 === 0) {
    if (base === 48) {
      base += 7;
    } else {
      base -= 7;
    }
  }

  mercury.play()
  venus.play()
  mars.play()
  earth.play()
  jupiter.play()
  saturn.play()
  neptune.play()
  uranus.play()

if(translateSlider.value() < 1751){
  mercury.stop()
  venus.stop()
  mars.stop()
  earth.stop()
  jupiter.stop()
  saturn.stop()
  neptune.stop()
  uranus.stop()

}

if(translateSlider.value() < 750){
  t = 0.5
  console.log('A')
  water.stop();
  } else if(translateSlider.value() > 751 && translateSlider.value() < 1750){
  t = 2
  console.log('B')
  water.play();
  }else if(translateSlider.value() > 1751){
  t = 4
  console.log('C')
  water.stop();
}

  let index = eighth %  major.length; // using major scale
  let note = midiToFreq(base + major[index]);
  synth.play(note, 0.2, timeFromNow, 0.2); //sun synth :)
 

  eighth = eighth + t;


  console.log(t, translateSlider.value())
  pop();
}

function mousePressed() {
  userStartAudio();

  loop.start(); 

  if (mouseX >= crab.pos.x && mouseX <= crab.pos.x + crab.dim &&
    mouseY >= crab.pos.y && mouseY <= crab.pos.y + crab.dim) {
    health -= 5;
}

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
      leftKeyPressed = true;
  } else if (keyCode === RIGHT_ARROW) {
      rightKeyPressed = true;
  }

  // if(MOUSEX == mercuryPic.x){
  //   if(MOUSEY == mercuryPic.Y){
  //     mercuryState = true;}
  // }
  // if(MOUSEX == venusState.x){
  //   if(MOUSEY == venusState.Y){
  //     venusState == true;}
  // }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
      leftKeyPressed = false;
  } else if (keyCode === RIGHT_ARROW) {
      rightKeyPressed = false;
  }
}
