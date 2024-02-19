class ParticleSystem{
    constructor(x, y){
        this.pos = createVector(x,y);
        this.particles = [];

    }
    update(){
        this.particles.push(new Particle(this.pos.x, this.pos.y))
        for (let particle of this.particles){
            particle.update();
            particle.show();

        }
    }
}