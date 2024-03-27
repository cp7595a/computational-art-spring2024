class Crab {
    constructor(x, y) {

        this.pos = createVector(x, y);
        this.vel = createVector(0.1, 0);
        this.acc = createVector(0, 0);

        this.maxSpeed = 1;
        this.maxForce = 0.05;

        this.dim = random(40, 60);

        this.hue = 180;
        this.saturation = 70;
        this.brightness = 100;

        this.mass = this.dim + random(80, 100);

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

    wrap() {
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }
    update() {  
            this.flow();
            this.wrap();
    
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
    
            this.acc.set(0,0);
        }
    

    show() {
        push();

        translate(this.pos.x, this.pos.y);

        fill(10, 100, 90); // Red color for the body
        ellipse(0, 0, this.dim, this.dim / 2);

        // Draw the claws of the crab
        fill(100); // White color for the claws
        ellipse(this.dim * 0.3, -this.dim * 0.2, this.dim * 0.2, this.dim * 0.4);
        ellipse(-this.dim * 0.2, -this.dim * 0.2, this.dim * 0.2, this.dim * 0.4);

        fill(0);
        ellipse(this.dim * 0.3, -this.dim * 0.2, this.dim * 0.2, this.dim * 0.2);
        ellipse(-this.dim * 0.2, -this.dim * 0.2, this.dim * 0.2, this.dim * 0.2);
        
        



        pop();
    }
}