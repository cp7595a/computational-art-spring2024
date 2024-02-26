class SunSystem {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.particles = [];

        this.active = true;

        this.maxLifetime = random(200, 400);
        this.length = random(3, 5); 
        this.speed = random(0.02, 0.5);
        this.hue = 55;
    }

    update() {
        if (this.active) {
            let numRaysPerFrame = 5; // sun rays per frame
            for (let p = 0; p < numRaysPerFrame; p++) {
                this.particles.push(new SunParticle(this.pos.x, this.pos.y, this.hue, this.length));
            }
        }
    
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let particle = this.particles[i];
            particle.update();
            particle.show();
            if (particle.lifetime <= 0) {
                this.particles.splice(i, 1); // kill it 
            }
        }
    
        if (frameCount > this.maxLifetime) {
            this.active = false;
        }
    }
}   