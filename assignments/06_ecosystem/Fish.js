class Fish {
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

        this.mass = this.dim + random(80, 100);

        this.range = 100;
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    flee(t) {
        let desired = p5.Vector.sub(t, this.pos);

        if (desired.mag() < 100) {

            desired.setMag(this.maxSpeed);

            let force = p5.Vector.sub(desired, this.vel);
            force.limit(this.maxForce);
            force.mult(-1);

            this.addForce(force);
        }
    }

    wrap() {
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }

    getCloseVehicles() {
        let closeVehicles = [];
        for (let vehicle of vehicles) {
            if (vehicle !== this) {
                if (dist(vehicle.pos.x, vehicle.pos.y, this.pos.x, this.pos.y) < this.range) {
                    closeVehicles.push(vehicle);
                }
            }
        }
        return closeVehicles;
    }

    cohesion(closeVehicles) {
        if (closeVehicles.length > 0) {
            let sumPositions = createVector(0, 0);
            for (let vehicle of closeVehicles) {
                sumPositions.add(vehicle.pos);
            }
            sumPositions.div(closeVehicles.length);

            let desired = p5.Vector.sub(sumPositions, this.pos);
            desired.setMag(this.maxSpeed);
            let steeringForce = p5.Vector.sub(desired, this.vel);
            steeringForce.limit(this.maxForce);
            return steeringForce;
            
        }

        return createVector(0,0);
    }


    alignment(closeVehicles) {
        let sumOfVelocities = createVector(0, 0);
        for (let vehicle of closeVehicles) {
            sumOfVelocities.add(vehicle.vel);
        }
        if (closeVehicles.length > 0) {
            sumOfVelocities.div(closeVehicles.length);
        }
        sumOfVelocities.setMag(this.maxSpeed);
        
        // compute steering force
        let steeringForce = p5.Vector.sub(sumOfVelocities, this.vel);
        steeringForce.limit(this.maxForce);

        return steeringForce;
    }



    update() {
        let closeVehicles = this.getCloseVehicles();
        // What actions is this agent pursuing?
        let cohesionForce = this.cohesion(closeVehicles);
        cohesionForce.mult(1);
        this.addForce(cohesionForce);


        let alignmentForce = this.alignment(closeVehicles);
        let n = noise(frameCount * 0.1);
        alignmentForce.mult(n);
        this.addForce(alignmentForce);

        this.wrap();


        // MOVEMENT
        this.vel.add(this.acc); // Apply acceleration (and thus the forces) to vel
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel); // Apply velocity to position

        this.acc.set(0,0);
    }

    show() {
        push();

        translate(this.pos.x, this.pos.y);

        let angle = this.vel.heading();
        rotate(angle);

        beginShape();
        fill(22, 89, 100);
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