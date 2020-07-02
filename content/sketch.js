let t = 0; // time variable
let spacing = 30;
function setup() {
  createCanvas(windowWidth - 20, 200).parent("rendertarget");
  noStroke();
  fill(0, 184, 212);
}

function draw() {
  background(255, 255, 255, 100); // translucent background (creates trails)

  // make a x and y grid of ellipses
  for (let x = 25; x <= width - 25; x = x + spacing) {
    for (let y = 25; y <= height - 25; y = y + spacing) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);

      ellipse(myX, myY, 10); // draw particle
    }
  }

  t = t + 0.01; // update time
}
