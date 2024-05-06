
// 5+ interconnections between aspects of your system
// 3+ types of media other than primitive drawing function:
// images, audio/music, video, natural language processing/generation, web cams, or something else we haven’t covered such as 3D

// IDEA:
// The Sounds of the World!
// Start river/park
// Under the ocean 
// Space
let rain = [];
let rainAmt = 15;
let sunflowers = []; // Array to store sunflowers



let img;
let imgWidth = 50;
let imgHeight = 50;

let leftKeyPressed = false;
let rightKeyPressed = false;
let mercuryState = false;
let venusState = false;
let earthState = false;
let marsState = false;
let jupiterState = false;
let saturnState = false;
let uranusState = false;
let neptuneState = false;

let mercurySize = 0;
let venusSize = 0;
let earthSize = 0;
let marsSize = 0;
let jupiterSize = 0;
let saturnSize = 0;
let uranusSize = 0;
let neptuneSize = 0;

let translatedFlowField = [];
let systems = [];
let flowField = [];
let fishes = [];

let health = 50; 

let numFishes = 20;
let numSystems = 10; 
let numCellsWidth = 20;
let numCellsHeight = 20;

let loop;
let loopInterval = 1;
let timeFromNow = 1;
let index;

let gravitationalConstant = 0.00001;
let downwardGravity;
let wind;


let p3;
let p2;

let eighth = 2;
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
  water = loadSound("./samples/water.mp3");

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
  spaceship =  loadImage("./pics/spaceship.png");

  ocean = loadImage("./pics/ocean.png");
  crab1 = loadImage("./pics/crab.png");
  dead_crab = loadImage("./pics/dead_crab.png");
  snail1 = loadImage("./pics/Snail.png");
  pirate = loadImage("./pics/pirate.png");
  pirate2 = loadImage("./pics/pirate2.png");
  carp = loadImage("./pics/carp.png")
  lionfish = loadImage("./pics/lionfish.png");
  bluediscus = loadImage("./pics/bluediscus.png");
  salmon = loadImage("./pics/salmon.png");


  mtns = loadImage("./pics/mountains.png");
  bird1 = loadImage("./pics/bird1.png");
  bird2 = loadImage("./pics/bird2.png");
  sunflower = loadImage("./pics/Sunflower.png");
}


function setup() {
  createCanvas(1000, 600);

  colorMode(HSB);
  noStroke();

  translateSlider = createSlider(0, 2000, 0, 1000); 
  translateSlider.position(10, height + 20);


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

  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    translatedFlowField[xIndex] = [];
    yoff = 0;
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      let angle = map(noise(xoff, yoff), 0, 1, 0, 2 * PI);
      translatedFlowField[xIndex][yIndex] = new Cell(angle, xIndex, yIndex);
    }
    yoff += inc;
    xoff += inc;
  }

  bird = new Bird(100, 300);

  for (let i = 0; i < 10; i++) { // Adjust the number of sunflowers as needed
    let x = random(width); // Generate random x position
    let y = random(height/1.5, height - 50); // Generate random y position
    sunflowers.push(new Sunflower(x, y, bird.pos.x)); // Create and store a new sunflower
}

  img = createCapture(VIDEO);
  img.size(imgWidth, imgHeight);
  img.hide();
 
  ship = new Ship(random(200, 700),random(200, 700))
  p2 = new Person(0, 500);
  p3 = new Astronaut(width/2, height/2);
  crab = new Crab(random(200, 700), 500)
  snail = new Snail(random(200, 700), 500)

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

  // SPACE SCENE
  push();
  translate(2000 - translateSlider.value(), 0);
  image(space, 0, 0, 1200, 600);

  for (let xIndex = 0; xIndex < numCellsWidth; xIndex++) {
    for (let yIndex = 0; yIndex < numCellsHeight; yIndex++) {
      translatedFlowField[xIndex][yIndex].update();
      translatedFlowField[xIndex][yIndex].show();
    }
  }


  if (mercuryState) {
    mercurySize += random(0.2, -0.2);
  }
  if (venusState) {
    venusSize += random(0.2, -0.2);
  }
  if (earthState) {
    earthSize += random(0.2, -0.2);
  }
  if (marsState) {
    marsSize += random(0.2, -0.2);
  }
  if (jupiterState) {
    jupiterSize += random(0.2, -0.2);
  }
  if (saturnState) {
    saturnSize += random(0.2, -0.2);
  }
  if (uranusState) {
    uranusSize += random(0.2, -0.2);
  }
  if (neptuneState) {
    neptuneSize += random(0.2, -0.2);
  }
 
 
  mercurySize = constrain(mercurySize, 50, 70);
  venusSize = constrain(venusSize, 70, 90);
  earthSize = constrain(earthSize, 70, 90);
  marsSize = constrain(marsSize, 65, 85);
  jupiterSize = constrain(jupiterSize, 105, 120);
  saturnSize = constrain(saturnSize, 50, 70);
  uranusSize = constrain(uranusSize, 50, 70);
  neptuneSize = constrain(neptuneSize, 50, 70);

  image(mercuryPic, 60, 315, mercurySize, mercurySize)
  image(venusPic, 150, 300, venusSize, venusSize)
  image(earthPic, 250, 300, earthSize, earthSize)
  image(marsPic, 350, 300, marsSize, marsSize)
  image(jupiterPic, 500, 300, jupiterSize, jupiterSize)
  image(saturnPic, 650, 300, saturnSize + 50, saturnSize + 25)
  image(uranusPic, 775, 300, uranusSize + 15, uranusSize + 15)
  image(neptunePic, 875, 300, neptuneSize + 20, neptuneSize + 20)
  

  fill(100);
  textSize(23);
  textFont('Times New Roman');
  text('Click the planets!', 450, 25);

  p3.update();
  p3.show();

  ship.update();
  ship.show();

  // rotate(ship.angle);

  pop();

  // OCEAN SCENE
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

  
  crab.update();
  crab.show();
  snail.update();
  snail.show();

  if (health >= 0){
    textSize(12);
    fill(100);
    text(health, crab.pos.x + 60, crab.pos.y - 20);
    text("Click me!", crab.pos.x + 10, crab.pos.y + 85);
    fill(0, 100, 100);
    rect(crab.pos.x, crab.pos.y - 25, health, 5);
  }


  for (let fish of fishes) {
    fish.update();
    fish.show();
  }


  p2.update()
  p2.show()

  if (health < 0){
    image(dead_crab, p2.pos.x - 5, p2.pos.y - 20, 65, 40);
}
  
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


  bird.update()
  bird.show()

  for (let drop of rain) {
    drop.show();
    drop.update();
}
for (let sunflower of sunflowers) {
  sunflower.show();
}

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

  const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
  const states = [mercuryState, venusState, earthState, marsState, jupiterState, saturnState, uranusState, neptuneState];
  
  for (let i = 0; i < planets.length; i++) {
    if (states[i]) {
      planets[i].play();
    } else {
      planets[i].stop();
    }
  }

if(translateSlider.value() != 2000){
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
  t = 1
  water.stop();
  } else if(translateSlider.value() > 751 && translateSlider.value() < 1750){
    t = 2
    water.play();
  }else if(translateSlider.value() == 2000){
    t = 4
    water.stop();
}

  let index = eighth %  major.length; 
  let note = midiToFreq(base + major[index]);
  synth.play(note, 0.2, timeFromNow, 0.2); 

  eighth = eighth + t;

  if(translateSlider.value() == 2000){
    index = 5
  }
  if (translateSlider.value() > 751 && translateSlider.value() < 1750){
    index = 0
  }
  if(translateSlider.value() < 750){
    index = 2
  }

  pop();
}

function mousePressed() {
  userStartAudio();

  loop.start();

  // CRAB HEALTH BEHAVIOR //
  if (mouseX >= crab.pos.x && mouseX <= crab.pos.x + crab.dim &&
    mouseY >= crab.pos.y && mouseY <= crab.pos.y + crab.dim) {
    health -= 5;
  }

  // TURN ON PLANET SOUND WHEN CLICKED // (tried to make a planet class but this part was too hard to implement)
    if (mouseX >= 60 && mouseX <= 60 + mercurySize && mouseY >= 315 && mouseY <= 315 + mercurySize) {
      if (mercury.isPlaying()) {
        mercuryState = false;
      } else {
        mercuryState = true;
      }
  }

  if (mouseX >= 150 && mouseX <= 150 + venusSize + 20 && mouseY >= 300 && mouseY <= 300 + venusSize + 20) {
      if (venus.isPlaying()) {
        venusState = false;
      } else {
        venusState = true;
      }
  }

  if (mouseX >= 250 && mouseX <= 250 + earthSize + 20 && mouseY >= 300 && mouseY <= 300 + earthSize + 20) {
      if (earth.isPlaying()) {
        earthState = false;
      } else {
        earthState = true;
      }
  }

  if (mouseX >= 360 && mouseX <= 360 + marsSize + 15 && mouseY >= 300 && mouseY <= 300 + marsSize + 15) {
      if (mars.isPlaying()) {
        marsState = false;
      } else {
        marsState = true;
      }
  }

  if (mouseX >= 500 && mouseX <= 500 + jupiterSize + 55 && mouseY >= 300 && mouseY <= 300 + jupiterSize + 50) {
      if (jupiter.isPlaying()) {
        jupiterState = false;
      } else {
        jupiterState = true;
      }
  }

  if (mouseX >= 650 && mouseX <= 650 + saturnSize + 50 && mouseY >= 300 && mouseY <= 300 + saturnSize + 25) {
      if (saturn.isPlaying()) {
        saturnState = false;
      } else {
        saturnState = true;
      }
    }
  if (mouseX >= 775 && mouseX <= 775 + uranusSize + 15 && mouseY >= 300 && mouseY <= 300 + uranusSize + 15) {
      if (uranus.isPlaying()) {
        uranusState = false;
      } else {
        uranusState = true;
      }
  }

  if (mouseX >= 875 && mouseX <= 875 + neptuneSize + 20 && mouseY >= 300 && mouseY <= 300 + neptuneSize + 20) {
      if (neptune.isPlaying()) {
        neptuneState = false;
      } else {
        neptuneState = true;
      }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
      leftKeyPressed = true;
  } else if (keyCode === RIGHT_ARROW) {
      rightKeyPressed = true;
  }

}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
      leftKeyPressed = false;
  } else if (keyCode === RIGHT_ARROW) {
      rightKeyPressed = false;
  }
}
