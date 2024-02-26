class AntSystem {
    constructor(x, y) {
        this.pos = createVector(x, y); 
        this.speed = random(0.2, 0.3); 
        this.size = random(1 , 3); 
    }
    wrap(){
        if (this.pos.x > width -10) {
            this.pos.x = 10;
            this.pos.y = random(300, 390)
        }
    }

    update() {
        this.pos.x += this.speed;
        this.wrap();
    }
    display() {
        fill(0); 
        noStroke(); 
        ellipse(this.pos.x, this.pos.y, this.size * 2, this.size); 
    }
}