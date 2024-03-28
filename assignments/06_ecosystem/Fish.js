class Fish {
    constructor(x, y, target) {

        this.pos = createVector(x, y);
        this.vel = createVector(1, 0);
        this.acc = createVector(0, 0);

        this.target = target; // crab target >:(
        
        this.active = false; // setting up activation for the flee v fight down below

        // speeds and forces
        this.maxSpeed = 1.2;
        this.maxForceFlee = 0.01;
        this.maxForceAttack = 0.03;
        this.maxCohesionForce = 0.001;
        this.maxAlignmentForce = 0.001;

        this.dim = random(10, 30);
        this.angle = 0;

        this.hue = 15 + this.dim/1.75;

        this.mass = 1;

        this.range = 125;

        this.fightBubbles = []
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    // for the little fish
    flee(t) {
        for (let fish of fishes) {
            if (fish !== this) {
                let desired = p5.Vector.sub(t, this.pos);
                if (desired.mag() < 100) {
                    desired.setMag(this.maxSpeed);
                    let force = p5.Vector.sub(desired, this.vel);
                    force.limit(this.maxForceFlee);
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

    //COHESE

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


    //ALINE
    alignment(closeFishes) {
        let sumOfVelocities = createVector(0, 0);
        for (let fish of closeFishes) {
            sumOfVelocities.add(fish.vel);
        }
        if (closeFishes.length > 0) {
            sumOfVelocities.div(closeFishes.length);
        }
        sumOfVelocities.setMag(this.maxSpeed);

        let steeringForce = p5.Vector.sub(sumOfVelocities, this.vel);
        steeringForce.limit(this.maxAlignmentForce);

        return steeringForce;
    }

    // FIGHT
    attack(t) {
        let desired = p5.Vector.sub(t, this.pos);
        if (desired.mag() < 100) {
            this.active = true;
            desired.setMag(this.maxSpeed);

            let force = p5.Vector.sub(desired, this.vel);
            force.limit(this.maxForceAttack);

            this.addForce(force);

            // if (this.active = true){
            //     gravity  = createVector(0, 0.1);
            //     this.fightBubbles.push(new BubbleSystem(this.pos.x, this.pos.y, gravity));
            //     for (let bubble of this.fightBubbles) {
            //         bubble.update();
            //         }
            //     }

            // tried to add bubbles to attack function but didnt know how to make them update as the position of the fish does
        }
    }

    update() {
        let closeFishes = this.getCloseFishes();

        this.attack(this.target);

        if (this.dim <= 15) { // RUN LITTLE FISH!! GO CRAZY!!
            this.flee(this.target);
        }


        let cohesionForce = this.cohesion(closeFishes);
        cohesionForce.mult(1);
        this.addForce(cohesionForce);


        let alignmentForce = this.alignment(closeFishes);
        let n = noise(frameCount * 0.1);
        alignmentForce.mult(n);
        this.addForce(alignmentForce);


        for (let bubble of this.fightBubbles) {
            bubble.update();
            }

        this.wrap();


        // movement and physics and stuff
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);

        this.acc.set(0, 0);


        if (!this.active) { // needed to create a reset because it wasn't ever going back to normal
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