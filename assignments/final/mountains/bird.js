class Bird {
    constructor(x, y) {

        this.pos = createVector(x, y);
        this.vel = createVector(-0.75, 0);
        this.acc = createVector(0, 0);

        this.maxSpeed = 3;
        this.maxForce = 0.05;

        // variable for the switching of movement frames
        this.count = 0; 
        this.imageFrameCount = 15; // 15 frame per second delay
        this.showingBird2 = false; // creating a state to regulate

        this.mass = 15;


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
            this.pos.x = width;
        }
    }
    update() {  
            this.wrap();
    
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
    
            this.acc.set(0,0);

            this.count++;

            downwardGravity = createVector(0, 0.38);
            for (let i = 0; i < rainAmt; i++) {
                let x = this.pos.x;
                let y = this.pos.y + 20;
                rain.push(new Rain(x, y, i + 1));
    
              }
    
            for (let i = rain.length - 1; i >= 0; i--) {
                rain[i].update();
                if (rain[i].pos.y > height/1.5) {
                    rain.splice(i, 1); // Remove raindrops if they go off-screen
                }
            }

    }

    show() {
        push();
        
        translate(this.pos.x, this.pos.y);

        fill(10, 100, 90);
        

    
    if (this.count >= this.imageFrameCount) { // switch images based on the frame count
        this.count = 0;  // the counter > frame count, reset it to 0
        if (this.showingBird2) { //switching constantly conditions 
            this.showingBird2 = false; 
        } else {
            this.showingBird2 = true; 
        }
}

    if (this.showingBird2) {
        image(bird1, 0, -10, 50, 45);
    } else {
        image(bird2, 0, -10, 55, 55);
    }

        pop();
    }
}