class Snow {
    constructor(x, y, index) {
        this.xog = x
        this.yog = y
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.index = index;


        // Index is the address in the dots array, let's use it for mass for no
        // important reason.
        this.mass = this.index;

        // Make the radius have something to do with the mass.
        this.radius = sqrt(this.mass) * 0.5;
    }

    wrap() {
        if (this.pos.y > height) { // set this up so when the snow pixels "die" they'll come back like the wrap function
            this.pos.x = random(0, 600);
            this.pos.y = random(0, 5);
            this.vel.y = 0;
            this.acc.y = 0;
        }
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
        // FORCES
        this.addForce(downwardGravity);

        // Apply water drag if the dot is overlapping with the water area.
        if (this.pos.y > height / 2) {
            this.addWaterDrag();
        }

        // MOVEMENT
        this.vel.add(this.acc); // Apply acceleration (and thus the forces) to vel
        this.vel.limit(1); // This limits the magnitude of the velocity vector
        this.pos.add(this.vel); // Apply velocity to position

        // Keep the dot on the screen by "wrapping" the position
        this.wrap();
        // Reset the acceleration back to (0,0). This is important because
        // forces need to be continually applied in order to affect velocity.
        // In other words, if we didn't do this, forces would accumulate over
        // multiple calls vto update(), which isn't what we want.
        this.acc.mult(0); 
    }

    show() {
        push();

        noStroke();

        translate(this.pos.x, this.pos.y);
        fill(0, 0, 100 , 0.5);
        ellipse(0, 0, this.radius);

        pop();

    }
}