class Cell {
    constructor(angle, xIndex, yIndex) {
        this.angle = angle;

        this.xIndex = xIndex;
        this.yIndex = yIndex;

        this.brightness = this.brightness

        this.offsetX = random(-1, 1);
        this.offsetY = random(-1, 1);

        this.scaleOffset = 0.05;

        this.lifetime = random(0, 0.2);
    }


    update() {
    
        this.offsetX += random(-0.1, 0.1)
        this.offsetY += random(-0.1, 0.1)
    
        this.scaleOffset += random(-0.005, 0.005);

        this.offsetX -= random(-0.05, 0.05)

        console.log(this.offsetX)

        if (this.scaleOffset > 2){
            this.scaleOffset = 1
        }

        this.lifetime += 0.5

        console.log(this.lifetime)
    }
    
    show() {

        this.brightness = map(this.lifetime, -100, 100, 70, 100)
        let x = cellWidth * this.xIndex + this.offsetX;
        let y = cellHeight * this.yIndex + this.offsetY;

        push();

        translate(x + cellWidth/2, y + cellHeight/2);
        rectMode(CENTER);
        fill(0, 0, this.brightness, 0.2);
        rotate(PI/4);
        scale(this.scaleOffset);
        rect(0, 0, cellWidth/2, cellHeight);
        // rotate(this.angle);
  

        
        pop();
    }
}