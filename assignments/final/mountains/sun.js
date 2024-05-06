class Sun {
    constructor(x, y) {

        this.pos = createVector(x, y);
        this.vel = createVector(0, 0.75);
        this.acc = createVector(0, 0);

        this.maxSpeed = 3;
        this.maxForce = 0.05;

        this.dim = 65;

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

    wrap() { // crab walk
        let wall = width - 75
        if (this.pos.x < 0 || this.pos.x > wall) {
            this.vel.x *= -1;
        }
    }
    update() {  
            this.wrap();
    
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
    
            this.acc.set(0,0);
        }
    

    show() {
        push();
        
        translate(this.pos.x, this.pos.y);

        fill(10, 100, 90);


        image(sun, 0, 0, 50, 50);


        pop();
    }
}