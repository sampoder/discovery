function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

var degree = 0;

let externalMultiplier = 1;

let internalMultiplier = 1;

let externalAddition = 0;

let internalAddition = 0;

function draw() {
  setTimeout(makeArt, 2000);
  degree = degree + 1;
}

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

function makeArt() {
  background("Black");
  var step = 40 + (Math.sin((internalMultiplier * degree * Math.PI) / 180)) * 20;
  for (var x = 0; x < innerWidth; x = x + step) {
    for (var y = 0; y < innerHeight; y = y + step) {
      strokeWeight(3);
      stroke("rgb(0,255,0)");
      line(x, y, x + 120, y + 120);
    }
  }
}
