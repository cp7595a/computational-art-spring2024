// constant globals 
let angle = 0;
let h = 5;
let y = 290;

// systems
let numDots = 2000;
let numSystems = 1;
let numRays = 6;
let numAnts = 30;

// lists
let dots = [];
let ants = [];
let flowers = [];
let systems = [];
let sunSystems = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);

  // global variable hue so that the color doesnt switch everytime draw function is called
  hue1 = random(0, 70)
  hue2 = random(210, 250)
  hue3 = random(260, 325)

  // gravity
  gravity = createVector(0, 0.1);

  // particle system 1 (watering can)
  for (let i = 0; i < numSystems; i++) {
    systems.push(new ParticleSystem(random(100, width-100), height));
  }

  // particle system 2 (sun rays)
  for (let i = 0; i < numRays; i++) {
    sunSystems.push(new SunSystem(20, 20));
  }

  // dot class and using it to make sky and sun
  for (let i = 0; i < numDots; i++) {
    let x = width
    let y = height/1.5;
    sky = random(180, 190)
    dots.push(new Dot(x, y, sky, 100, 100));
    dots.push(new Dot(x, 50, 0, 0, 100));
    dots.push(new Dot(80, 75, 60, 100, 100)); //sun shape
    dots.push(new Dot(85, 75, 55, 100, 100)); 
  }

  // ants
  for (let i = 0; i < numAnts; i++) {
    ants.push(new AntSystem(random(width), random(300, 390)));
}
}

function draw() {
  background(190, 100, 100, 0.2);

  // display our sky first
  for (let dot of dots) {
    dot.display();
  }
  
  // sky dots so sun looks circular
  fill(180, 100, 100);
  ellipse(75, 80, 15, 15);
  ellipse(85, 65, 20, 20);
  fill(190, 100, 100);
  ellipse(79, 75, 15, 15);
  ellipse(80, 75, 15, 15);
  fill(185, 100, 100);
  ellipse(90, 55, 15, 15);
  ellipse(70, 80, 15, 15);
  ellipse(90, 80, 20, 20);



  // WATERING CAN //
  push();

  noStroke();

  translate(width / 2, height / 4); // translate to draw the watering can in the middle
  rotate(angle); //create a variable by which to rotate for watering can effect
  
  fill(80);
  rect(0, 5, 30, 15);
  rect(20, -5, 50, 65);
  triangle(10, 15, -10, 25, -10, -5);

  fill(75);
  ellipse(-10, 10, 10, 30);
  ellipse(45, -5, 50, 5);

  noFill();
  stroke(80);
  strokeWeight(4);
  ellipse(75, 25, 45, 45);


  stroke(75);

  point(-10,0);
  point(-9,5);
  point(-12,9);
  point(-9,13);
  point(-12,16);
  point(-9,20);

  x3 = 57
  y3 = 35
  
  noStroke();
  fill(320, 70, 100);

  ellipse(x3, y3,20,20);
  ellipse(x3-15,y3+5, 20, 20);
  ellipse(x3-25,y3 -5, 20 ,20);
  ellipse(x3- 17,y3 -20, 20, 20);
  ellipse(x3,y3-15, 20, 20);
  fill (55, 100, 90);
  ellipse(x3-12,y3-7, 22, 22)

  pop();



  // DIRT//
  fill(32, 71, 43);
  rect(0, 270, width, 100);
  fill(35, 84, 38);
  rect(0, 300, width, 100);

  stroke(29, 29, 68);
  strokeWeight(5);

  point(50, 380);
  point(350, 350);
  point(200, 350);
  point(100, 315);
  point(250, 315);
  point(450, 315);
  point(550, 330);
  point(525, 375);
  


  // DIRT HOLES //
  fill(42, 89, 18);
  noStroke();
  ellipse(width/4, 275, 75, 40);
  ellipse(width/2, 275, 75, 40);
  ellipse(450, 275, 75, 40);



  // GRASS//
  fill(111, 66, 21);
  rect(0, 265, width, 15);
  fill(114, 90, 32);
  rect(0, 255, width, 10);
  
  


  // PLANTS //
  fill(63, 44, 48, 0.9);
  rect(width/4, y, 5, h);
  fill(63, 44, 48, 0.9);
  rect(width/2, y, 5, h);
  fill(63, 44, 48, 0.9);
  rect(450, y, 5, h);
  line(30, 20, 85, 75);



  // BORDER //
  noFill();
  strokeWeight(10);
  stroke(0, 0, 70);
  rect(0, 0, width, height);

  // ants
  for (let ant of ants) {
    ant.update();
    ant.display();
}

  // sun systems
  for (let ss of sunSystems) {
    ss.update();
  }




  // WATERING CAN SIDEWAYS CONDITION //
  if (angle == - PI/4) {
    for (let ps of systems) {
      ps.update();
    }
    if (h <= 80) {
      // console.log(h)
      h += 0.2;
      y -= 0.2;
  }else {
    // FLOWER 1
    x1 = width/4 + 15;
    y1 = 215;

    noStroke();

    fill(hue1, 90, 100);
    ellipse(x1, y1,20,20);
    ellipse(x1-15,y1+5, 20, 20);
    ellipse(x1-25,y1 -5, 20 ,20);
    ellipse(x1-17,y1 -20, 20, 20);
    ellipse(x1,y1-15, 20, 20);
    fill (55, 100, 90);
    ellipse(x1-12,y1-7, 22, 22);

    // FLOWER 2
    x2 = width/2 + 15;
    y2 = 225;

    noStroke();

    fill(hue2, 80, 100);
    ellipse(x2, y2,20,20);
    ellipse(x2-15,y2+5, 20, 20);
    ellipse(x2-25,y2-5, 20 ,20);
    ellipse(x2-17,y2-20, 20, 20);
    ellipse(x2,y2-15, 20, 20);
    fill (55, 100, 90);
    ellipse(x2-12,y2-7, 22, 22);

    // FLOWER 3
    x3 = 465
    y3 = 215
    noStroke();
    fill(hue3, 70, 100);
    ellipse(x3, y3,20,20);
    ellipse(x3-15,y3+5, 20, 20);
    ellipse(x3-25,y3 -5, 20 ,20);
    ellipse(x3- 17,y3 -20, 20, 20);
    ellipse(x3,y3-15, 20, 20);
    fill (55, 100, 90);
    ellipse(x3-12,y3-7, 22, 22)
  } 
  }

}
function mousePressed() { // rotate can with mouse press
    angle -= PI / 4;
    if (angle != - PI/4) {
      angle = 0;
  }
  }