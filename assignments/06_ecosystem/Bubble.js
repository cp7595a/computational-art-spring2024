class Bubble {
    constructor(x, y, brightness, gravity) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(0.01, 0.05), random(0.01, 0.05));
        this.acc = createVector(0, 0);

        this.brightness = brightness;

        this.gravity = gravity;

        this.mass = random(1, 1.5);

        this.radius = this.mass;

        this.lifetime = random(30, 55);
    }



    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    addWaterDrag() {
        let dragConstant = -0.3;
        let forceDrag = this.vel.mag() * this.vel.mag() * dragConstant;
        let drag = p5.Vector.normalize(this.vel);
        drag.mult(forceDrag);
        this.addForce(drag);
    }

    update() {
        this.lifetime--;
        if (this.lifetime < 0) {
            this.destroy = true;
        }

        this.radius += 0.05;

        this.addForce(this.gravity);

        if (this.pos.y > 400) {
            this.addWaterDrag(); //slow towards surface
        }

        this.vel.add(this.acc);
        this.vel.limit(1.95);
        this.pos.add(this.vel);

        this.acc.mult(0);
    }

    show() {
        push();

        noStroke();

        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);
        
        fill(0, 0, 90, 0.05 - map(this.lifetime, 50, 75, 0.2, 0.5));
        ellipse(0, 0, this.radius * 2);

        pop();
    }
}