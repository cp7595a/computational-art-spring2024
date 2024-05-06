class Sunflower {
    constructor(x, y, birdX) {
        this.pos = createVector(x, y);
        this.imageSize = 50; // Adjust size as needed
        this.birdX = birdX; // Assign birdY parameter to this.birdY property
    }

    show() {
        let distance = this.pos.x - this.birdX;


        image(sunflower, this.pos.x, this.pos.y, this.imageSize, this.imageSize); // Display sunflower image

        
    }
}
