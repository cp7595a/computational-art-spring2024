class Dot {
  constructor(x, y, hue, saturation, brightness) {
    this.x = random(x);
    this.y = random(y);
    this.radius = random(5, 10);
    this.hue = hue;
    this.saturation = saturation;
    this.brightness = brightness;
  }

  display() {
    fill(this.hue, this.saturation, this.brightness, 0.8);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }
  
}
