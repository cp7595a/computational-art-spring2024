class Rain {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 3); // Initial velocity
        this.acc = createVector(0, 0); // Initial acceleration

        this.gravity = createVector(0, 0.1); // Define gravity

        this.radius = 5; // Adjust radius as needed
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    wrap() {
        if (this.pos.y > height) { // set this up so when the snow pixels "die" 
            // they'll come back like the wrap function
            this.pos.x = random(0, 600);
            this.pos.y = random(0, 5);
            this.vel.y = 0;
            this.acc.y = 0;
        }
    }

    update() {
        // FORCES

        // Apply water drag if the dot is overlapping with the water area.
        if (this.pos.y > height) {
            this.addWaterDrag();
        }

        // MOVEMENT
        this.vel.add(this.acc); // Apply acceleration (and thus the forces) to vel
        this.vel.limit(1); // This limits the magnitude of the velocity vector
        this.pos.add(this.vel); // Apply velocity to position

        
        this.wrap();

        this.acc.mult(0); 
    }


    show() {
        noStroke();
        // fill(0, 0, 100); // Adjust color as needed
        // ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2); // Draw raindrop
    }
}
