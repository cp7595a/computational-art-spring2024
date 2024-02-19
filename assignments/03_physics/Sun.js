class Sun {
  constructor(x, y, ang) {
    this.pos = createVector(x + 200, y - 100);
    this.xoff = random(1000);
    this.radiusVariation = 50; // how much variation is in the shape
    this.angleWidth = ang; // making a size variable for my for 
    // loop down there (I originally had 2 PI calc here but this way was cuter so I left it)

  }
  update() {
    this.xoff += 0.01; // updating it and incrementing it
    this.pos.y += 0.01; // gravity
  }

  show() {
    noStroke();
    fill(48, 77, 88, this.brightness); // Set background color with brightness

    beginShape();
    for (let i = 0; i < this.angleWidth; i++) {
      let angle = this.angleWidth * i / TWO_PI; // calculating the angle for a circle although 
      // the formula has the side length * 360 this worked better bc of individual points (happy accident)

      let noiseVal = noise(cos(angle) + this.xoff, sin(angle) + this.xoff); // I looked up what 

      let r = noiseVal * this.radiusVariation + this.angleWidth; // adding noise to the radius val
      let x = this.pos.x + r * cos(angle); // using formula online to calc x
      let y = this.pos.y + r * sin(angle); // using formula online to calc x
      vertex(x, y);
    }
    endShape();
  }
}
