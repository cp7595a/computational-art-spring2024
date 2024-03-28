class ParticleSystem {
    constructor(x, y, gravity) {
        this.pos = createVector(x, y);
        this.particles = [];
        this.bubbles = [];

        this.active = false;

        this.gravity = gravity;

        this.bubbleStart = random (400, 425);
        this.radius = random(50, 100);
        this.speed = random(-0.05, -1);

        this.hue = random(360);
    }

    update() {
        if (this.pos.y < this.bubbleStart) {
            this.active = true;
        } else {
            this.pos.x += map(noise((frameCount + this.bubbleStart)/50), 0, 1, -15, 15);
            this.pos.y += this.speed;
        }

        if (this.active && this.particles < 200) {
            this.particles.push(new Particle(this.pos.x, this.pos.y, this.hue, this.gravity));
        }

        if (this.active && this.particles < 100) {
            this.bubbles.push(new Particle(this.pos.x, this.pos.y, this.hue, this.gravity));
        }

        for (let particle of this.particles) {
            particle.update();
            particle.show();
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (this.particles[i].destroy) {
                this.particles.splice(i, 1);
            }
        }
    }
}