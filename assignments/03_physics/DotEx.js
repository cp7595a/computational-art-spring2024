class dotEx {
    constructor(x, y, index, size) {
        this.position = createVector(x + random(-2, 2), y + random(-2, 2));
        this.vel = createVector(random(-5, 5), random(-5, 5));
        this.acc = createVector(0, 0);
        this.accelarationConst = 0.85;
        this.gravity = .2;

        this.index = index;
        this.hue = map(this.index, 0, numDots, 150, 250);

        this.mass = numDots - this.index + 1;

        this.size = size;

    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    wrap() {
        if (this.pos.y > height) { // set this up so when the snow pixels "die" they'll come back like the wrap function
            this.pos.x = random(100, 500);
            this.pos.y = random(0, 100);
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
        forceDrag *= 0.9;
        let drag = p5.Vector.normalize(this.vel);
        drag.mult(forceDrag);
        this.addForce(drag);
    }

    update() {
        // this.addForce(wind);

        if (this.position.y > height) {
            this.addWaterDrag();
        }
        
        this.accelarationConst += 0.005;

        this.position.x += this.vel.x;
        this.position.y += this.vel.y;
        this.vel.x *= this.accelarationConst;
        this.vel.y *= this.accelarationConst;
        this.vel.y += this.gravity;
    }

    show() {
        let diam = 2 + sqrt(this.mass);
        noStroke();
        fill(this.hue, 100, 100);
        triangle(this.position.x, this.position.y - this.size/2, 
            this.position.x - this.size/2, this.position.y + this.size/2, 
            this.position.x + this.size/2, this.position.y + this.size/2);
    }
}