class Dot {
    constructor(x, y, index) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.xog = x;
        this.yog = y;

        this.index = index;

        this.hue = map(this.index, 0, numDots, 150, 250);

        // Index is the address in the dots array, let's use it for mass for no
        // important reason.
        this.mass = this.index;

        // Make the radius have something to do with the mass.
        this.radius = 5 + sqrt(this.mass);
    }

    wrap() {
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    applyGravityToOtherDots() {
        for (let dot of dots) {
            if (dot !== this) {
                let vectorFromMeToOtherDot = p5.Vector.sub(dot.pos, this.pos);
                let d = vectorFromMeToOtherDot.mag();

                // F = (G * m1 * m2) / d^2
                let gForce = (gravitationalConstant * this.mass * dot.mass) / d * d;

                vectorFromMeToOtherDot.normalize();
                vectorFromMeToOtherDot.mult(gForce);
                vectorFromMeToOtherDot.mult(-1);
                dot.addForce(vectorFromMeToOtherDot);
            }
        }
    }

    // This formula is based on some fancy drag force formula. I simplify it to 
    // only use one constant.
    addWaterDrag() {
        // fDrag = -C * mag(velocity)^2
        let dragConstant = -0.3;
        let forceDrag = this.vel.mag() * this.vel.mag() * dragConstant;
        let drag = p5.Vector.normalize(this.vel);
        drag.mult(forceDrag);
        this.addForce(drag);
    }

    update() {
        // FORCES
        this.addForce(downwardGravity);
        // this.addForce(wind);
        // This will loop through all dots, and apply a force attracting them to 
        // this dot (using the formula for gravity).
        // this.applyGravityToOtherDots();

        // Apply water drag if the dot is overlapping with the water area.
        if (this.pos.y + this.radius > height/2) {
            this.addWaterDrag();
        }

        // MOVEMENT
        this.vel.add(this.acc); // Apply acceleration (and thus the forces) to vel
        this.vel.limit(5); // This limits the magnitude of the velocity vector
        this.pos.add(this.vel); // Apply velocity to position

        // Keep the dot on the screen by "wrapping" the position
        this.wrap();

        // Reset the acceleration back to (0,0). This is important because
        // forces need to be continually applied in order to affect velocity.
        // In other words, if we didn't do this, forces would accumulate over
        // multiple calls to update(), which isn't what we want.
        this.acc.mult(0);
    }

    show() {
        push();

        noStroke();

        translate(this.pos.x, this.pos.y);
        fill(this.hue, 50, 100, 0.5);
        ellipse(0, 0, this.radius * 2);

        pop();
    }

    resetPosition() {
        this.pos.x = this.xog
        this.pos.y = this.yog // You can adjust this range as needed
    }
}