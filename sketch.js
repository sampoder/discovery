const slices = 14;

let volume = 0.20

var shape, mask, img;

let fft;

let currentColourMode = "RAINBOW";

function setup() {
  getAudioContext().suspend();
  createCanvas(windowWidth, windowHeight);
  noStroke();
  shape = calcStuff(width, height, slices);
  mask = createMask(shape.a, shape.o);
}

function mousePressed() {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then(function (stream) {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);
      javascriptNode.onaudioprocess = function () {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var values = 0;
        var length = array.length;
        for (var i = 0; i < length; i++) {
          values += array[i];
        }
        var average = values / length;
        volume = (Math.round(average) / 100);
        console.log(volume)
      };
    })
    .catch(function (err) {
      /* handle the error */
    });
}

function draw() {
  background(0);
  drawShapes(volume);
  mirror();
}

function drawShapes(energy) {
  let numShapes = energy * 600;
  console.log(numShapes)
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
  img = get(0, 0, shape.a, shape.o);
  img.mask(mask);
  push();
  translate(width / 2, height / 2);
  rotate(radians(frameCount / 3));
  for (var i = 0; i < slices; i++) {
    if (i % 2 == 0) {
      push();
      scale(1, -1);
      image(img, 0, 0);
      pop();
    } else {
      rotate(radians(360 / slices) * 2);
      image(img, 0, 0);
    }
  }
  pop();
}

function calcStuff(width, height, s) {
  let a = sqrt(sq(width / 2) + sq(height / 2));
  let theta = radians(360 / s);
  let o = tan(theta) * a;
  let h = a / cos(theta);
  return { a: round(a), o: round(o), h: round(h) };
}

function createMask(w, h) {
  mask = createImage(w, h);
  mask.loadPixels();
  for (i = 0; i < mask.width; i++) {
    for (j = 0; j < mask.height; j++) {
      if (i >= map(j, 0, h, 0, w) - 1) mask.set(i, j, color(255));
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
  currentColourMode = data.colour;
});
