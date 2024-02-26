
class SunParticle {
    constructor(x, y, h, l) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(0, 1.5), random(0.6, 0.9)); // reduce vel so that its slower
        this.acc = createVector(0, 0);

        this.hue = h;
        this.length = l;
        this.lifetime = random(100, 270);
    }

    update() {
        this.lifetime--;
        this.pos.add(this.vel); 
        this.length -= 0.1;
    }

    show() {
        push();
        colorMode(HSB);
        noStroke();
        fill(this.hue, 60, 100, 0.1);
        rect(this.pos.x, this.pos.y, this.length);
        pop();
    }
}