class BubbleSystem {
    constructor(x, y, gravity) {
        this.pos = createVector(x, y);
        this.bubbles = [];

        this.active = false;

        this.gravity = gravity;

        this.bubbleStart = random (400, 425);

        this.speed = random(0.05, 0.5);

    }

    update() {
        if (this.pos.y < this.bubbleStart) {
            this.active = true;
        } else {
            this.pos.x += map(noise((frameCount + this.bubbleStart)/50), 0, 1, -15, 15);
            this.pos.y += this.speed;
        }

        if (this.active && this.bubbles < 10) {
            this.bubbles.push(new Bubble(this.pos.x, this.pos.y, this.hue, this.gravity));
        }

        for (let bubble of this.bubbles) {
            bubble.update();
            bubble.show();
        }

        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            if (this.bubbles[i].destroy) {
                this.bubbles.splice(i, 1);
            }
        }
    }
}