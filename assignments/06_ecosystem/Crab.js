class Crab {
    constructor(x, y) {

        this.pos = createVector(x, y);
        this.vel = createVector(0.75, 0);
        this.acc = createVector(0, 0);

        this.maxSpeed = 3;
        this.maxForce = 0.05;

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

    wrap() { // crab walk
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        }
    }
    update() {  
            // this.flow();
            this.wrap();
    
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
    
            this.acc.set(0,0);
        }
    

    show() {
        push();

        //CRABBBB
        
        translate(this.pos.x, this.pos.y);

        fill(10, 100, 90);

        push();
        rotate(PI/4);
        rect(this.dim - 50, -this.dim + 10, this.dim - 58, this.dim - 20);
        triangle(this.dim - 40, -this.dim - 5, this.dim - 35, -this.dim + 15, this.dim - 45, -this.dim + 15); 
        triangle(this.dim - 48, -this.dim - 5, this.dim - 43, -this.dim + 15, this.dim - 53, -this.dim + 15); 
        pop();
        
        push();
        rotate(-PI/4);
        rect(-this.dim + 45, -this.dim + 10, this.dim - 58, this.dim - 20);
        triangle(-this.dim + 45, -this.dim -5, -this.dim + 40, -this.dim + 15, -this.dim + 50, -this.dim + 15); // Claw 1
        triangle(-this.dim + 53, -this.dim -5 , -this.dim + 48, -this.dim + 15, -this.dim + 58, -this.dim + 15); // Claw 2
        pop();

        
        push();
        rotate(PI);
        rect(this.dim - 50, -this.dim + 35, this.dim - 60, this.dim - 40);
        pop();
        
        push();
        rotate(PI * 2);
        rect(this.dim - 50, -this.dim + 50, this.dim - 60, this.dim - 20);
        pop();
        



        ellipse(0, 0, this.dim, this.dim/2);
        fill(0);
        arc(0, this.dim / 10, this.dim / 2, this.dim / 4, 0, PI);

        fill(100);
        ellipse(this.dim * 0.3, -this.dim * 0.2, this.dim * 0.2, this.dim * 0.4);
        ellipse(-this.dim * 0.2, -this.dim * 0.2, this.dim * 0.2, this.dim * 0.4);

        fill(0);
        ellipse(this.dim * 0.3, -this.dim * 0.2, this.dim * 0.2, this.dim * 0.2);
        ellipse(-this.dim * 0.2, -this.dim * 0.2, this.dim * 0.2, this.dim * 0.2);





        pop();
    }
}