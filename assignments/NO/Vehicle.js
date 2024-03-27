class Vehicle {
    constructor(x, y, target) {

        this.pos = createVector(x, y);
        this.vel = createVector(1, 0);
        this.acc = createVector(0, 0);

        this.target = target;
        this.maxSpeed = 2;
        this.maxForce = 0.1;

        this.dim = 5 + random(5);

        this.hue = 0;
        this.saturation = 0;
        this.brightness = random(0, 80);

        this.mass = 1;
        
        this.range = 5;
    }

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    seek(t) {
        let desired = p5.Vector.sub(t, this.pos);
        desired.setMag(this.maxSpeed);

        let force = p5.Vector.sub(desired, this.velocity);
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
        return closeVehicles
    }

    update() {
        let closeVehicles = this.getCloseVehicles();
        if (closeVehicles.length > 2){
            this.seek(this.target);
        }

        else{
        this.vel.add(this.acc); // Apply acceleration (and thus the forces) to vel
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel); // Apply velocity to position

        this.acc.set(0,0);}
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