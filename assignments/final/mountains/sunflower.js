class Sunflower {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.imageSize = 30; 
        this.maxSize = 60;
    }

    show() {

        image(sunflower, this.pos.x, this.pos.y, this.imageSize, this.imageSize);
    }
    
}
