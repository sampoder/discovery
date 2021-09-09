function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

var degree = 0;

function draw() {
  setTimeout(makeArt, 2000);
  degree = degree + 1;
}

function makeArt() {
  background("Black");
  console.log(degree);
  var step = 40 + (Math.sin((degree * Math.PI) / 180)) * 20;
  for (var x = 0; x < innerWidth; x = x + step) {
    for (var y = 0; y < innerHeight; y = y + step) {
      strokeWeight(3);
      stroke('rgb(0,255,0)')
      line(x, y, x + 120, y + 120);
    }
  }
}
