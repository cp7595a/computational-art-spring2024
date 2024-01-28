
// let dots = [];
// let numDots = 100;
// gravity = 0.98

// function setup() {

//   createCanvas(800, 600);

//   colorMode(HSB);
//   noStroke();
  
//   //dot = new Dot(100, 350, 50);
//   for(let i = 0; i < numDots; i++) {
//     let x = width/numDots * i;
//     dots[i] = new Dot(x, height/2, 10, i); //random(600 to make the positions random)
//   }

// }

// function draw() {
//   background(0, 0, 100, 1);
  
//   for(let i = 0; i < dots.length; i++) { 
//     dots[i].update();
//   }
//   //dot.update()
// }

// class Dot {
//   constructor(x, y, diameter, id) {
//       //this.x = x;
//       //this.y = y;
//       this.position= createVector(x, y);
//       this.velocity = createVector(0, 0);
//       this.diameter = diameter * this.id / 50;

//       this.id = id;

//       this.hue = this.id / numDots * 360;
//   }
//   update() {
//       //this.x += random(-1, 1);
//       //this.y += random(-1, 1);
//       // let vectorToMouse = createVector(mouseX - this.position.x, mouseY - this.position.y);
//       // vectorToMouse.normalize(); 
//       // vectorToMouse.mult(0.3);

//       //this.velocity = vectorToMouse;

//       this.velocity.y += gravity

//       this.position.add(this.velocity)

//       if (this.position.y + this.diameter/2 > height) {
//         this.velocity.y *= -1;
//         this.position.add(this.velocity);
//       }

//       fill(this.hue, 50, 100);
//       ellipse(this.position.x, this.position.y, this.diameter, this.diameter);

//   }
// }

let dots = [];
let numDots = 1000;
let gravity = 0.098;

// p5 calls this function right away when the webpage is loaded
function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  noStroke();
  
  triangle = new Triange(100, 100, 100, 100, 100, 100);
}

// The draw function is called over and over again really fast by p5
function draw() {
  background(0, 0, 100, 0.08);

  thing.update();
}



// Below, we define the Dot class, which defined the objects we instantiate inside the
// setup function above.
class Triangle {
  constructor(x1, x2, x3, y1, y2, y3) {
    this.hue = 0;

    this.point1 = createVector(x1, y1);
    this.point2 = createVector(x2, y2);
    this.point3 = createVector(x3, y3);
  }

  // To define a function inside of a class in javascript, you just
  // write the name you want to give it, write some paraentheses, and then
  // write the body of the function.
  update() {

    this.hue += 5; // hue = hue + 1;
    let saturation = mouseX / width * 100;
  
    fill(this.hue % 360, saturation, 100);
    triangle(this.point1.x1, this.point1.y1, this.point2.x2, this.point2.y2,  
      this.point3.x3, this.point3.y3, );
  }
}