class Particle {
    constructor(x, y, brightness, gravity) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-5, 5), random(-5, 5));
        this.acc = createVector(0, 0);

        this.brightness = brightness;

        this.gravity = gravity;

        this.mass = random(1, 1.5);

        this.radius = 1 + this.mass;

        this.lifetime = random(300, 400);
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

        // FORCES
        this.addForce(this.gravity);

        if (this.pos.y > 400) {
            this.addWaterDrag();
        }

        // MOVEMENT
        this.vel.add(this.acc); // Apply acceleration (and thus the forces) to vel
        this.vel.limit(1.95); // This limits the magnitude of the velocity vector
        this.pos.add(this.vel); // Apply velocity to position

        this.acc.mult(0);
    }

    show() {
        push();

        noStroke();

        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);
        
        fill(0, 0, 90, 0.05 - map(this.lifetime, 0, 100, .5, 0));
        ellipse(0, 0, this.radius * 2);

        pop();
    }
}