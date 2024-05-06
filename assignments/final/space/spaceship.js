class Ship {
    constructor(x, y) {

        this.pos = createVector(x, y);
        this.vel = createVector(0.75, 0);
        this.acc = createVector(0, 0);

        this.maxSpeed = 1;
        this.maxForce = 0.05;

        this.mass = 1000;
        this.angle = random(PI, TWO_PI); 
        this.angleSpeed = random(0.01); 

    }
    addForce(force) {
        let forceWithMass = p5.Vector.div(force, this.mass);
        this.acc.add(forceWithMass);
    }

    applyRandom() {
        let randomForce = createVector(random(-0.01, 0.01), random(-0.01, 0.01));
        this.addForce(randomForce);
    }

    wrap() {
        if (this.pos.x < -10) {
            this.pos.x = width;
        } else if (this.pos.x > width - 10) {
            this.pos.x = 0; 
        }
    
        if (this.pos.y < -10) {
            this.pos.y = height; 
        } else if (this.pos.y > height - 10) {
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

        rotate(this.angle);
        tint(175, 45, 100, 100); // https://p5js.org/reference/#/p5/tint found this on the reference :)
        image(img, 35, 65, 80, 60);
        noTint();
        image(spaceship, 0, 0, 150, 350)


        pop();
    }
}