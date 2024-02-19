class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.alpha = 255;
    this.size = random(2, 6);
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }
  
  display() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.size, this.size);
  }
  
  isFinished() {
    return this.alpha <= 0;
  }
}
