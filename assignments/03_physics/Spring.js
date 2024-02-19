class Spring {
    constructor(p1, p2) {
      this.p1 = p1;
      this.p2 = p2;
      this.restLength = p5.Vector.sub(p1.pos, p2.pos).mag();
      this.stiffness = 0.1;
    }
  
    update() {
      let force = p5.Vector.sub(this.p1.pos, this.p2.pos);
      let stretch = force.mag() - this.restLength;
      force.normalize().mult(-1 * this.stiffness * stretch);
  
      this.p1.applyForce(force);
      this.p2.applyForce(force.copy().mult(-1));
    }
  
    display() {
      stroke(255);
      line(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
    }
  }