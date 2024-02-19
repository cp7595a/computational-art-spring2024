let particles = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  
  // Update and display all particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
  // Create a burst of particles at the mouse position
  for (let i = 0; i < 100; i++) {
    let p = new Particle(mouseX, mouseY);
    particles.push(p);
  }
}
