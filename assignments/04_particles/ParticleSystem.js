class ParticleSystem {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.particles = [];

        this.active = false;

        this.waterCanHeight = 125;
        this.radius = random(1, 3);
        this.speed = -9;

        this.hue = random(190, 215);
    }

    update() {
        // Move upward until watercan height, and then activate the particle instantiation
        if (this.pos.y < this.waterCanHeight) {
            this.active = true;
        } else {
           // Draw the particle system point when it isn't active (to sort of look like a firework)
            // Below is a bunch of me just messing around with position and size.
            // this.pos.x += map(noise((frameCount + this.waterCanHeight)/50), 0, 1, -2, 2);
            this.pos.x = 300;
            this.pos.y += this.speed;
        }

        // If active, create a particle every time update is called
        if (this.active) {
            this.particles.push(new Particle(this.pos.x, this.pos.y, this.hue));
        }

        // Update and display all the particle system's particles
        for (let particle of this.particles) {
            particle.update();
            particle.show();
        }

        // If the particle's lifetime reached zero, remove it from the system's array
        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (this.particles[i].destroy) {
                this.particles.splice(i, 1);
            }
        }
    }
}