class Fish {
    constructor(x, y, target) {

        this.pos = createVector(x, y);
        this.vel = createVector(1, 0);
        this.acc = createVector(0, 0);

        this.target = target;
        
        this.active = false;
        this.maxSpeed = 2;
        this.maxForceAttack = 0.007;
        this.maxCohesionForce = 0.001;
        this.maxAlignmentForce = 0.001;

        this.dim = random(10, 30);
        this.angle = 0;

        this.hue = 22;
        this.saturation = 70;
        this.brightness = 125;

        this.mass = 1;


        this.range = 125;
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    flee(t) {
        for (let fish of fishes) {
            if (fish !== this) {
                let desired = p5.Vector.sub(t, this.pos);
                if (desired.mag() < 100) {
                    desired.setMag(this.maxSpeed);
                    let force = p5.Vector.sub(desired, this.vel);
                    force.limit(this.maxForce);
                    force.mult(-1);
                    this.addForce(force);
                }
            }
        }
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

    getCloseFishes() {
        let closeFishes = [];
        for (let fish of fishes) {
            if (fish !== this) {
                if (dist(fish.pos.x, fish.pos.y, this.pos.x, this.pos.y) < this.range) {
                    closeFishes.push(fish);
                }
            }
        }
        return closeFishes;
    }

    cohesion(closeFishes) {
        this.maxSpeed = map(this.dim, 10, 30, 2.1, 0.1);

        if (!this.active && closeFishes.length > 0) { // Check if not attacking
            let sumPositions = createVector(0, 0);
            for (let fish of closeFishes) {
                sumPositions.add(fish.pos);
            }
            sumPositions.div(closeFishes.length);

            let desired = p5.Vector.sub(sumPositions, this.pos);
            desired.setMag(this.maxSpeed);
            let steeringForce = p5.Vector.sub(desired, this.vel);
            steeringForce.limit(this.maxCohesionForce);
            return steeringForce;

        }

        return createVector(0, 0);
    }


    alignment(closeFishes) {
        let sumOfVelocities = createVector(0, 0);
        for (let fish of closeFishes) {
            sumOfVelocities.add(fish.vel);
        }
        if (closeFishes.length > 0) {
            sumOfVelocities.div(closeFishes.length);
        }
        sumOfVelocities.setMag(this.maxSpeed);

        // compute steering force
        let steeringForce = p5.Vector.sub(sumOfVelocities, this.vel);
        steeringForce.limit(this.maxAlignmentForce);

        return steeringForce;
    }

    attack(t) {
        let desired = p5.Vector.sub(t, this.pos);
        if (desired.mag() < 100) {
            this.active = true;
            desired.setMag(this.maxSpeed);

            let force = p5.Vector.sub(desired, this.vel);
            force.limit(this.maxForceAttack);

            this.addForce(force);

            new ParticleSystem(0, 0, createVector(0, -0.05));
        }
    }

    update() {
        let closeFishes = this.getCloseFishes();

        this.attack(this.target);

        if (!this.active && this.dim < 15) { // Check if not attacking
            this.flee(this.target);
        }


        let cohesionForce = this.cohesion(closeFishes);
        cohesionForce.mult(1);
        this.addForce(cohesionForce);


        let alignmentForce = this.alignment(closeFishes);
        let n = noise(frameCount * 0.1);
        alignmentForce.mult(n);
        this.addForce(alignmentForce);

        // this.flow();


        this.wrap();


        // MOVEMENT
        this.vel.add(this.acc); // Apply acceleration (and thus the forces) to vel
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel); // Apply velocity to position

        this.acc.set(0, 0);


        if (!this.active && this.dim >= 20) { // needed to create a reset because it wasn't ever going back to normal
            this.active = false;
        }
    }

    show() {
        push();

        translate(this.pos.x, this.pos.y);

        let angle2 = this.vel.heading();
        rotate(angle2);

        beginShape();
        fill(this.hue, 89, 100);
        vertex(this.dim, 0);
        vertex(-this.dim, this.dim/2);
        vertex(-this.dim, -this.dim/2);
        endShape(CLOSE);

        ellipse(this.dim, -this.dim/7, this.dim + 25, this.dim + 5)

        noStroke();
        fill(33, 33, 33);
        ellipse(this.dim /.8, -5, this.dim / 4, this.dim / 4);
        rect(this.dim - 5, this.dim * - 0.75, this.dim / 4, this.dim + 4);
        rect(this.dim - 15, this.dim * - 0.65, this.dim / 4, this.dim);

        pop();
    }
}