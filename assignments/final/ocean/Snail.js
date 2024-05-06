class Snail {
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

    wrap() { 
        let wall = width - 75
        if (this.pos.x < 0 || this.pos.x > wall) {
            this.vel.x *= -1;
        }
        
    }
    crab() { 
        if (crab.pos.x - snail.pos.x <= 100) {
           this.pos.x = crab.pos.x + 20
           this.pos.y = crab.pos.y - 75
        } 
        
    }
    death() { 
        if (health <= 0) {
           this.pos.x = p2.pos.x - 25;
           this.pos.y = 500;
        } 
        
    }
    update() {  
            this.wrap();
            this.crab();
            this.death();
    
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
    
            this.acc.set(0,0);

        }
    

    show() {
        push();
        
        translate(this.pos.x, this.pos.y);
        
        fill(10, 100, 90);

        image(snail1, 0, 50, 30, 30);



        pop();
    }
}