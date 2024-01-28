// 'let' is the keyword we use to define a block scoped variable
let thing;

// p5 calls this function when the webpage is loaded. Think of this
// function as the place you initialize the sketch.
function setup() {
  // This p5 function will add a canvas to the webpage
  createCanvas(400, 300);

  // https://p5js.org/reference/#/p5/colorMode
  colorMode(HSB);

  // This will instantiate an instance of the Thing class defined below
  thing = new Thing(100, 100);
}

// p5 calls this function over and over again. Think of this as the
// entry point for where you will write your code.
function draw() {
  background(0, 0, 100);

  // Call the function called 'update' inside of the Thing object.
  thing.update();
}


// A class defines a potential object (a "blueprint" of an object).
// NOTE: The "constructor" function is where we define all of the variable 
// that will live in an "instantiated" object of the class "Thing". 
class Thing {
  constructor(x, y) {
    // To define a variable, we need to make use of the 'this' keyword. 
    // 'this' refers to the instantiated object. 
    this.hue = 0;

    this.position = createVector(x, y);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
  }

  // To define a function inside of a class in javascript, you just
  // write the name you want to give it, write some paraentheses, and then
  // write the body of the function.
  update() {
    this.position.add(this.velocity);
    if (this.position.x > width || this.position.x < 0) {
      this.velocity.x *= -1;
    }
  
    if (this.position.y > height || this.position.y < 0) {
      this.velocity.y *= -1;
    }
  
    this.hue += 5; // hue = hue + 1;
    let saturation = mouseX / width * 100;
  
    fill(this.hue % 360, saturation, 100);
    circle(this.position.x, this.position.y, 100);
  }

}