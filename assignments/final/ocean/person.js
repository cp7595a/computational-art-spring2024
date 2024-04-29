class Person {
    constructor(x, y) {

        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.maxSpeed = 3;
        this.maxForce = 0.05;

        // variable for the switching of movement fames
        this.count = 0; 
        this.imageFrameCount = 15; // 15 frame per second delay
        this.showingPirate2 = false; // creating a state to regulate

        this.dim = 65;

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
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        if (this.pos.x > width) {
            this.pos.x = width;
        }
    }
    update() {  
            this.wrap();
    
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
    
            this.acc.set(0,0);

            this.count++; //increment with update

    }

    show() {
        push();
        
        translate(this.pos.x, this.pos.y);

        fill(10, 100, 90);
        

    
    if (this.count >= this.imageFrameCount) { // switch images based on the frame count
        this.count = 0;  // the counter > frame count, reset it to 0
        if (this.showingPirate2) { //switching constantly conditions 
            this.showingPirate2 = false; 
        } else {
            this.showingPirate2 = true; 
        }
}

if (this.showingPirate2) {
    image(pirate2, 0, -10, 55, 100);
} else {
    image(pirate, 0, -10, 50, 100);
}

        pop();
    }
}