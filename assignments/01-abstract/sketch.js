let rects = [];
let rects2 = [];
let rects3 = [];
let rects4 = [];

let numRect = 8;

function setup() {
  createCanvas(700, 700);
  colorMode(HSB);
  
  // background triangles (theres a lot sorry)
  back1 = new Triangle(105, 300, 355, 100, 605, 300);
  back2 = new Triangle(105, 300, 355, 500, 605, 300);

  back3 = new Triangle(635, 475, 355, 500, 605, 300);
  back4 = new Triangle(580, 120, 355, 100, 605, 300);

  back5 = new Triangle(66, 55, 355, 100, 150, 120);
  back6 = new Triangle(525, 55, 355, 100, 580, 120);

  back7 = new Triangle(242, 586, 355, 500, 150, 480);
  back8 = new Triangle(105, 300, 65, 55, 150, 120);
  
  back9 = new Triangle(105, 300, 355, 100, 150, 120);
  back10 = new Triangle(105, 300, 355, 500, 150, 480);

  back11 = new Triangle(400, 300, 355, 500, 150, 480);
  back12 = new Triangle(635, 655, 355, 500, 65, 655);

  back13 = new Triangle(66, 55, 356, 103, 525, 55);
  back14 = new Triangle(66, 55, 150, 480, 65, 480);
  
  back15 = new Triangle(355, 500, 635, 465, 635, 655);
  back16 = new Triangle(150, 480, 227, 569, 65, 655);

  back17 = new Triangle(525, 55, 635, 475, 635, 55);
  back18 = new Triangle(150, 480, 65, 655, 65, 480);




  // border using the arrays we discussed in class but making them static, still part of class
  for (let i = 0; i < numRect; i++) {
    let x = width / numRect * i;
    rects[i] = new Rectangle (100, 55, x, 0);
    rects2[i] = new Rectangle (65, 88, 0, x);
    rects3[i] = new Rectangle (65, 88, 635, x);
    rects4[i] = new Rectangle (100, 55, x, 655);
  }


  // some of the petals of the flower that wasnt supposed to be anything

}

function draw() {

  background(0);

  console.log(mouseX, mouseY)

  for (let i = 0; i < rects.length; i++) {
    rects[i].update();
    rects2[i].update();
    rects3[i].update();
    rects4[i].update();
  }

  let background1 = [back1, back2, back3, back4, back5, back6, back7, back8, 
    back9, back10, back11, back12, back13, back14, back15, back16, back17, back18];

  for (let i = 0; i < background1.length; i++) {
    background1[i].update();
  }

  // rest of my shapes below, not using classes (down here so they're drawn after)
  
   fill(42, 56, 100)
   circle(360, 300, 150)

   fill(184, 31, 40)
   rect(355, 295, 6, 150);

  fill(357, 34, 87)

  triangle(330, 275, 358, 200, 386, 275)
  triangle(250, 200, 345, 300, 300, 300);
  triangle(465, 200, 370, 300, 415, 300);
  triangle(330, 275, 308, 210, 386, 275);
  triangle(330, 275, 408, 210, 386, 275);
  triangle(280, 210, 360, 320, 300, 300);
  triangle(435, 210, 355, 320, 415, 300);
  triangle(330, 275, 358, 230, 386, 275);
  triangle(330, 275, 358, 290, 386, 275);

}
// class Triangle
class Triangle {
  constructor(x1, y1, x2, y2, x3, y3) {
    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
    this.brightness = 100;
    
  }
  update() {
    // the mouse moving to the left reduces saturation
    let saturation = mouseX / width * 100;
    
    fill(0, saturation, 25);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }
}

// class Rectangle

class Rectangle {
  constructor(l, w, x, y) {

    this.position = createVector(x, y);
    this.l = l;
    this.w = w;
    this.hue = hue;
    this.brightness = brightness;

  }
  
  update() {
    let saturation = mouseX / width * 100;
    let hue = 199;
    
    fill(hue, saturation, 15);
    rect(this.position.x, this.position.y, this.l, this.w);
  }

} 