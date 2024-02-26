class Particle {
    constructor(x, y, h) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-2, 2), random(-1, 1));
        this.acc = createVector(0, 0);

        this.hue = (h + random(20)) % 360;

        this.mass = random(1, 5);

        // Make the radius have something to do with the mass.
        this.radius = 1 + sqrt(this.mass);

        this.lifetime = random(50, 200);
    }


    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    addWaterDrag() {
        // fDrag = -C * mag(velocity)^2
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

        this.radius -= 0.1;

        // FORCES
        this.addForce(gravity);

        if (this.pos.y > height/2) {
            this.addWaterDrag();
        }

        // MOVEMENT
        this.vel.add(this.acc); // Apply acceleration (and thus the forces) to vel
        this.vel.limit(5); // This limits the magnitude of the velocity vector
        this.pos.add(this.vel); // Apply velocity to position


        this.acc.mult(0);
    }

    show() {
        push();

        noStroke();

        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);
        fill(this.hue, 100, 100, 0.9 - map(this.lifetime, 0, 50, 0.6, 0.3));
        ellipse(0, 0, this.radius * 2);

        pop();
    }
}