
let ps;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

  ps = new ParticleSystem(width/2, height/2)
}

function draw() {
  background(0, 0, 100);

  ps.update();
}


