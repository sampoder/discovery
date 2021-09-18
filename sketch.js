const slices = 14;

var shape, mask, img;

let fft;

let currentColourMode = "RAINBOW";

function setup() {
  createCanvas(windowWidth, windowHeight);
  //colorMode();
  noStroke();
  //angleMode(DEGREES);
  // any additional setup code goes here

  shape = calcStuff(width, height, slices);
  mask = createMask(shape.a, shape.o);
  let mic = new p5.AudioIn();
  mic.start();

  console.log(shape);
}

function draw() {
  // your "draw loop" code goes here
  background(0);
  let spectrum;
  spectrum = 5;

  // draw lots of random moving shapes on the canvas
  drawShapes(spectrum);

  // try removing this line to see what happens
  mirror();
}

function drawShapes(energy) {
  //console.log(energy)
  let numShapes = (energy / 10) * 500;
  // draw lots of random moving shapes on the canvas
  for (var i = 0; i < numShapes; i++) {
    switch (currentColourMode) {
      case "RED":
        fill(255, cos(i) * 100, sin(i) * 100);
        break;
      case "GREEN":
        fill(cos(i) * 100, 255, sin(i) * 100);
        break;
      case "BLUE":
        fill(cos(i) * 100, sin(i) * 100, 255);
        break;
      default:
        fill(cos(i) * 255, sin(i) * 255, tan(i) * 150);
    }
    ellipse(
      sin(frameCount / 100 + i * 0.4) * width,
      cos(i * 0.23) * height,
      80 + cos(frameCount / 40 + 400 - i) * 50,
      80 + cos(frameCount / 30 + i) * 50
    );
    switch (currentColourMode) {
      case "RED":
        fill(255, sin(i) * 100, cos(i) * 100);
        break;
      case "GREEN":
        fill(sin(i) * 150, 255, cos(i) * 150);
        break;
      case "BLUE":
        fill(sin(i) * 100, cos(i) * 100, 255);
        break;
      default:
        fill(sin(i) * 255, tan(i) * 255, cos(i) * 255);
    }
    rect(
      cos(frameCount / 300 + i * 0.4) * width,
      sin(i * 0.23) * height,
      80 + cos(frameCount / 40 + 400 - i) * 50,
      80 + tan(frameCount / 430 + i) * 50
    );
  }
}

function mirror() {
  // copy a section of the canvas
  img = get(0, 0, shape.a, shape.o);
  // cut it into a triangular shape
  img.mask(mask);

  push();
  // move origin to centre
  translate(width / 2, height / 2);
  // turn the whole sketch over time
  rotate(radians(frameCount / 3));

  for (var i = 0; i < slices; i++) {
    if (i % 2 == 0) {
      push();
      scale(1, -1); // mirror
      image(img, 0, 0); // draw slice
      pop();
    } else {
      rotate(radians(360 / slices) * 2); // rotate
      image(img, 0, 0); // draw slice
    }
  }
  pop();
}

function calcStuff(width, height, s) {
  // because pythagorean theorem
  // h = sqrt(a^2 + b^2)
  // a = sqrt(h^2 - b^2)
  // b = sqrt(h^2 - a^2)
  let a = sqrt(sq(width / 2) + sq(height / 2));
  let theta = radians(360 / s);
  let o = tan(theta) * a;
  let h = a / cos(theta);

  return { a: round(a), o: round(o), h: round(h) };
}

function createMask(w, h) {
  // create triangular mask so that the parts of the
  // kaleidoscope don't draw over one another

  mask = createImage(w, h);
  mask.loadPixels();
  for (i = 0; i < mask.width; i++) {
    for (j = 0; j < mask.height; j++) {
      if (i >= map(j, 0, h, 0, w) - 1)
        // -1 removes some breaks
        mask.set(i, j, color(255));
    }
  }
  mask.updatePixels();
  return mask;
}

var degree = 0;

let externalMultiplier = 1;

let internalMultiplier = 1;

let externalAddition = 0;

let internalAddition = 0;

var pusher = new Pusher("9e9ba095c4dd756509de", {
  cluster: "ap1",
});

var channel = pusher.subscribe("main-channel");
channel.bind("sine-update", function (data) {
  externalMultiplier = parseFloat(data.externalMultiplier);
  internalMultiplier = parseFloat(data.internalMultiplier);
  externalAddition = parseFloat(data.externalAddition);
  internalAddition = parseFloat(data.internalAddition);
});

channel.bind("colour-update", function (data) {
  currentColourMode = data.colour
});
