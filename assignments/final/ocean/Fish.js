class Fish {
    constructor(x, y, target, fish_type) {

        this.pos = createVector(x, y);
        this.vel = createVector(1, 0);
        this.acc = createVector(0, 0);

        this.target = target; // crab target >:(
        
        this.active = false; // setting up activation for the flee v fight down below

        // speeds and forces
        this.maxSpeed = 1;
        this.maxForceFlee = 0.01;
        this.maxCohesionForce = 0.001;
        this.maxAlignmentForce = 0.005;

        this.dim = random(10, 30);
        this.angle = 0;

        this.hue = 15 + this.dim/1.75;

        this.mass = 1;

        this.range = 150;

        this.fightBubbles = []

        this.fish_type = fish_type;
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    flow() {
        let arrayIndeces = positionToFlowFieldIndex(this.pos.x, this.pos.y);
        let angle = flowField[arrayIndeces.x][arrayIndeces.y].angle;
        let force = p5.Vector.fromAngle(angle);
        force.limit(this.maxForce);
        this.addForce(force);
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
        let width_max = 1200
        let height_max = 490
        this.pos.x = (this.pos.x + width_max) % width_max;
        this.pos.y = (this.pos.y + height_max) % height_max;
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

    //COHERE

    cohesion(closeFishes) {
        this.maxSpeed = map(this.dim, 10, 30, 1, 0.5);
        
        if (!this.active && closeFishes.length > 0) { // Check if not attacking
            // Filter closeFishes array to include only fishes of the same type
            let sameTypeFishes = closeFishes.filter(fish => fish.fish_type === this.fish_type);
            
            if (sameTypeFishes.length > 0) {
                let sumPositions = createVector(0, 0);
                for (let fish of sameTypeFishes) {
                    sumPositions.add(fish.pos);
                }
                sumPositions.div(sameTypeFishes.length);
    
                let desired = p5.Vector.sub(sumPositions, this.pos);
                desired.setMag(this.maxSpeed);
                let steeringForce = p5.Vector.sub(desired, this.vel);
                steeringForce.limit(this.maxCohesionForce);
                return steeringForce;
            }
        }
    
        return createVector(0, 0);
    }
    
    // ALIGN
    alignment(closeFishes) {
        let sameTypeFishes = closeFishes.filter(fish => fish.fish_type === this.fish_type);
        
        let sumOfVelocities = createVector(0, 0);
        for (let fish of sameTypeFishes) {
            sumOfVelocities.add(fish.vel);
        }
        if (sameTypeFishes.length > 0) {
            sumOfVelocities.div(sameTypeFishes.length);
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
        }
    }

    update() {
        let closeFishes = this.getCloseFishes();

        this.flee(this.target);

        // if (this.dim <= 15) { // RUN LITTLE FISH!! GO CRAZY!!
        //     this.flee(this.target);

        // }


        
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
            this.flow();
        }
    }

    show() {
        push();

        translate(this.pos.x, this.pos.y);

        let angle2 = this.vel.heading();
        rotate(angle2);

        if (this.fish_type == 1){
            image(carp, this.dim, this.dim/2, 35 + this.dim, 25 + this.dim);
        }
        if (this.fish_type == 2){
            image(salmon, this.dim, this.dim/2, 35 + this.dim, 15 + this.dim);
        }
        if (this.fish_type == 3){
            image(blue, this.dim, this.dim/2, 25 + this.dim, 20 + this.dim);
        }
       
        pop();
    }
}