function drawCircles(x, y, diameter) {
    count++;
    blendMode(DIFFERENCE);
    let h = (colorSlider.value() + map(count + frameCount * pulsingSlider.value(), 0, 100, 10, 360)) % 360;
    fill(h, 60, 100);
    noStroke();
  
    if (count % 2 === 0) {
      ellipse(x, y, diameter);
      
      ellipse(x - 10, y - 10, diameter);
      ellipse(x + 10, y + 10, diameter);
      
      ellipse(x + 50, y + 50, diameter);
      ellipse(x + 50, y - 50, diameter);
  
      ellipse(x + 150, y - 150, diameter);
      ellipse(x + 150, y - 150, diameter);
    } else {
      rect(x, y, diameter, diameter);
      ellipse(x + 10, y + 10, diameter, diameter)
    
    }
  
    if (diameter > 10) {
      drawCircles(x, y, diameter / map(sin(movingSlider.value()), -1, 1, 1.1, 2));
    }
  }