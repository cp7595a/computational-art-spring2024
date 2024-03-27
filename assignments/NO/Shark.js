class Shark {
    constructor(x, y, target) {

        this.pos = createVector(x, y);
        this.vel = createVector(1, 0);
        this.acc = createVector(0, 0);

        this.target = target;
        this.maxSpeed = 2;
        this.maxForce = 0.05;

        this.dim = random(10, 25);

        this.hue = 180;
        this.saturation = 70;
        this.brightness = 100;

        this.mass = map(this.dim, 10, 25, 85, 100);
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    seek(t, arrive) {

        let desired = p5.Vector.sub(target, this.pos);

        desired.setMag(this.maxSpeed);

        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);

        this.addForce(steer);
    }

    wrap() {
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }

    flow() {
        let arrayIndeces = positionToFlowFieldIndex(this.pos.x, this.pos.y);
        let angle = flowField[arrayIndeces.x][arrayIndeces.y].angle;
        let force = p5.Vector.fromAngle(angle);
        force.limit(this.maxForce);
        this.addForce(force);
    }

    update() {
        this.seek(this.target);


        // MOVEMENT
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);

        this.wrap();

        this.acc.set(0,0);
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        fill(0, 0, 60);
        ellipse(0, 0, this.dim, this.dim * 0.5); 
    }
    
}