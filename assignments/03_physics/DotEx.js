class dotEx {
    constructor(x, y, index, size) {
        this.pos = createVector(x + random(-2, 2), y + random(-2, 2));
        this.vel = createVector(random(-5, 5), random(-5, 5));
        this.acc = createVector(0, 0);
        this.accelarationConst = 0.85;
        this.gravity = .2;

        this.index = index;
        this.hue = map(this.index, 0, numDots, 150, 250);

        this.mass = numDots - this.index + 10;

        this.size = size;

    }
    diePixels() { //had a lot of infinite pixels oops
        for (let i = dots.length - 1; i >= 0; i - 1) { //
            if (this.pos.y > height) {
                dots.splice(i, 1);
            }
        }
    }
    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    addAirDrag() {
        // fDrag = -C * mag(velocity)^2
        let dragConstant = -0.3;
        let forceDrag = this.vel.mag() * this.vel.mag() * dragConstant;
        forceDrag *= 0.9;
        let drag = p5.Vector.normalize(this.vel);
        drag.mult(forceDrag);
        this.addForce(drag);
    }

    update() {
        // this.addForce(wind);

        if (this.pos.y > height) {
            this.addAirDrag();
        }
        this.accelarationConst += 0.005;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.x *= this.accelarationConst;
        this.vel.y *= this.accelarationConst;

        this.vel.y += this.gravity;

        this.diePixels();

    }

    show() {
        let diam = 2 + sqrt(this.mass);
        noStroke();
        fill(this.hue, 100, 100);
        ellipse(this.pos.x, this.pos.y, diam, diam)
        triangle(this.pos.x, this.pos.y - this.size/2, 
            this.pos.x - this.size/2, this.pos.y + this.size/2, 
            this.pos.x + this.size/2, this.pos.y + this.size/2);
    }
    draw() {
        let diam = 2 + sqrt(this.mass);
        noStroke();
        fill(this.hue, 100, 100);
        ellipse(this.pos.x, this.pos.y, diam, diam)
    }
}