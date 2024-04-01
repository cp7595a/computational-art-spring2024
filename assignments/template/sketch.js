let count = 0;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB);
  
  // noFill();
  // drawCircle(width/2, height/2, 400);
  // console.log(count);

  background(0, 0, 100);  
}


function branch(l) {
  count++;

  strokeWeight(1 + count * 0.08);
  line(0,0,0,-l);

  translate(0, -l);

  l = l * 0.6;

  if (l > 5) {
    push();
    rotate(radians(-45 + map(noise(frameCount * 0.01), 0, 1, -2, 2)));
    branch(l);
    pop();

    push();
    rotate(radians(45 + map(noise(frameCount + 100) * 0.01, 0, 1, -2, 2)));
    branch(l);
    pop();
  } else {
    
    ellipse(0, 0, 50);
  }
}

function draw() {
  // background(0, 0, 0, 0.01);
  // translate(width/2, height/2);
  // rotate(frameCount * 0.004);
  count = 0;
  // drawCircle(0, 0, 400 + sin(frameCount * 0.01) * 200)

  // count = 0;
  translate(width/2, height);
  branch(150);
}


function drawCircle(x, y, w) {

  noFill();
  stroke(map(count, 0, 100, 0, 360), 60, 100); 
  ellipse(x, y, w);

  count++;

  w *= 0.5;

  // console.log(count);
  // if (count > 10000) return;

  if (w > 100) {
    drawCircle(x, y, w);
    drawCircle(x-15, y, w / (1+ noise(frameCount* 0.01)));
    drawCircle(x+15, y, w / (1+ noise(frameCount* 0.01)));
    drawCircle(x, y+50, w);
    drawCircle(x, y-50, w);
  }
}