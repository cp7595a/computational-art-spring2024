class Vehicle {
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
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    seek(t, arrive) {
        // 1. Compute the desired velocity and set it to be maxSpeed
        let desired = p5.Vector.sub(t, this.pos);

        let distance = desired.mag();

        // If the caller passed in true, and we are close to the target, scale our
        // speed based on the distance.
        if (arrive && distance < 100) {
            let speed = map(distance, 0, 100, 0, this.maxSpeed);
            desired.setMag(speed);
        } else {
            desired.setMag(this.maxSpeed);
        }

        // 2. Compute the force by seeing the the change is in velocities
        // to move from the current velocity to the desired velocity and limit
        // its magnitude.
        let force = p5.Vector.sub(desired, this.vel);
        force.limit(this.maxForce);

        // 3. Apple this "steering" force. 
        this.addForce(force);
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

    flow() {
        let arrayIndeces = positionToFlowFieldIndex(this.pos.x, this.pos.y);
        let angle = flowField[arrayIndeces.x][arrayIndeces.y].angle;
        let force = p5.Vector.fromAngle(angle);
        force.limit(this.maxForce);
        this.addForce(force);
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

    update() {
        // this.flow();

        let closeVehicles = this.getCloseVehicles();
        let cohesionForce = this.cohesion(closeVehicles);
        cohesionForce.mult(1);
        this.addForce(cohesionForce);


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

        let angle = this.vel.heading();
        rotate(angle);

        let arrayIndeces = positionToFlowFieldIndex(this.pos.x, this.pos.y);
        let h = flowField[arrayIndeces.x][arrayIndeces.y].hue;
        h += 0.01;
        h = h  % 360;
        fill(h, this.saturation, this.brightness);

        //Draw a triangle
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