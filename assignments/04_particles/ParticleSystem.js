class ParticleSystem {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.particles = [];

        this.active = false;

        this.waterFall = 125;
        this.radius = random(1, 3);
        this.speed = -9;

        this.hue = random(190, 215);
    }

    update() {
        if (this.pos.y < this.waterFall) {
            this.active = true;
        } else {
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