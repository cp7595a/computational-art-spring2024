class Astronaut {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.maxSpeed = 4;
        this.maxForce = 0.05;

        this.mass = 100;


        this.angle = random(0, TWO_PI); 
        this.angleSpeed = random(-0.02, 0.02); 

    }
    

    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    applyRandom() {
        let randomForce = createVector(random(-3, 3), random(-0.5, 0.5));
        this.addForce(randomForce);
    }

    wrap() {
        if (this.pos.x < 0) {
            this.pos.x = width;
        } else if (this.pos.x > width) {
            this.pos.x = 0; 
        }
    
        if (this.pos.y < 0) {
            this.pos.y = height; 
        } else if (this.pos.y > height) {
            this.pos.y = 0;
        }
    }
    
    update() {
        this.wrap();
        this.applyRandom();

        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);

        this.pos.add(this.vel);
        this.acc.set(0, 0);

        this.angle += this.angleSpeed;
    }
    
    show() {
        push();
        translate(this.pos.x, this.pos.y);
        fill(10, 100, 90);

        rotate(this.angle);

        image(astronaut, 0, -10, 50, 100);

        pop();
    }
}
