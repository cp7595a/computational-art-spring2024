let count = 0;
let branchRand;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
  
  background(0, 0, 100);

  branchRand = random();
}

function branch(l) {
  count++;

  push();
  strokeWeight(1); // Reduce stroke weight for thinner lines
  line(0, 0, 0, -l);
  ellipse(0, 0, 5); // Decrease the size of ellipses
  ellipse(3, 0, 5);
  pop();

  translate(0, -l);

  l = l * 0.6;

  if (l > 1) { // Adjust the minimum length to stop recursion
    push();
    rotate(radians(-45 + map(noise(frameCount * 0.01), 0, 1, -2, 2)));
    branch(l);
    pop();

    push();
    rotate(radians(-45 + map(noise(frameCount * 0.01), 0, 1, -2, 2)));
    branch(l);
    pop();

    push();
    rotate(radians(45 + map(noise(frameCount + 100) * 0.01, 0, 1, -2, 2)));
    branch(l);
    pop();

    push();
    rotate(radians(70 + map(noise(frameCount + 100) * 0.01, 0, 1, -2, 2)));
    branch(l / 2);
    pop();

    push();
    rotate(radians(-70 + map(noise(frameCount + 100) * 0.01, 0, 1, -2, 2)));
    branch(l / 2);
    pop();
  }
}

function draw() {
  translate(width/ 2, height); // Start drawing from the bottom center
  branch(40); // Initial length of branches (half of the original)
}
