class Cell {
    constructor(angle, xIndex, yIndex) {
        this.angle = angle;

        this.xIndex = xIndex;
        this.yIndex = yIndex;

        this.hue = map(this.angle, 0, 2 * PI, 100, 300);

        this.offsetX = random(-1, 1);
        this.offsetY = random(-1, 1);
        this.offsetRotation = 0;

        this.scaleOffset = 0;
    }

    update() {
        // this.angle += 0.001; removed because I want the fish to just move L to R
        this.hue = map(this.angle, 0, 2 * PI, 100, 300);
        this.hue = (this.hue + 360) % 360;

        this.offsetX += random(-1, 1);
        this.offsetY += random(-1, 1);
        this.offsetRotation += 0.1;

        this.scaleOffset += random(-.01, .01);
    }

    show() {
        let x = cellWidth * this.xIndex + this.offsetX;
        let y = cellHeight * this.yIndex + this.offsetY;

        push();

        // translate(x + cellWidth/2, y + cellHeight/2);
        // rectMode(CENTER);
        // fill(this.hue, 70, 100);
        // rotate(this.offsetRotation);
        // scale(this.scaleOffset);
        // rect(0, 0, cellWidth, cellHeight);
        // rotate(this.angle);
  
        pop();
    }
}