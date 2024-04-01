function drawCircles(x, y, diameter) {
    count++;
    blendMode(DIFFERENCE);
    let hue = (map(count + frameCount * pulsingSlider.value(), 0, 100, 10, 360)) % 360;
    let brightness = map(x, -150, 150, 65, 100)
    let saturation = map(y, -150, 150, 70, 100)
    fill(hue, saturation, brightness);
    noStroke();
  
    if (count % 2 === 0) {
      ellipse(x, y, diameter);
      
      ellipse(x - 10, y - 10, diameter);
      ellipse(x + 10, y + 10, diameter);
      
      ellipse(x + 50, y + 50, diameter);
      ellipse(x + 50, y - 50, diameter);

      ellipse(x + 150, y + 150, diameter * 2);
      ellipse(x + 150, y - 150, diameter * 2);

    } else {
        rect(x, y, diameter, diameter);
        rect(x - 10 , y + 10, diameter/2, diameter/2);
    
    }
  
    if (diameter > 10) {
      drawCircles(x, y, diameter / map(sin(diameterSlider.value()), -1, 1, 1.2, 2));
    }
  }