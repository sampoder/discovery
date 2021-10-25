let colorlist = ["gold", "yellow", "turquoise", "red"];

let externalMultiplier = 255;

let externalAddition = 0;

let internalAddition = 100;

let internalMultiplier = 1;

function degreesToRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function calculateSine(theXCord, currentFrameCount) {
  return currentState == "sine"
    ? Math.sin(
        degreesToRadians(
          internalMultiplier * (theXCord + currentFrameCount) + internalAddition
        )
      ) *
        externalMultiplier +
        externalAddition
    : Math.cos(
        degreesToRadians(
          internalMultiplier * (theXCord + currentFrameCount) + internalAddition
        )
      ) *
        externalMultiplier +
        externalAddition;
}

function presentSine(sineResult) {
  sineResult = sineResult;
  let yCord;
  if (sineResult > 0) {
    yCord = windowHeight / 2 - sineResult;
  } else if (sineResult < 0) {
    yCord = windowHeight / 2 + Math.abs(sineResult);
  } else {
    yCord = windowHeight / 2;
  }
  return yCord;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();
  textFont(
    `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif`
  );
  textStyle(BOLD);
}

function draw() {
  fill(`rgb(0,0)`);
  strokeWeight(1);
  clear();
  for (let i = 0; i < windowWidth / 10; i++) {
    stroke(200);
    beginShape();
    vertex(i * 10, 0);
    vertex(i * 10, windowHeight);
    endShape();
  }
  for (let i = 0; i < windowHeight / 10; i++) {
    strokeWeight(1);
    stroke(200);
    beginShape();
    vertex(0, i * 10);
    vertex(windowWidth, i * 10);
    endShape();
  }
  stroke(0);
  strokeWeight(3);
  beginShape();
  vertex(0, windowHeight / 2);
  vertex(windowWidth, windowHeight / 2);
  endShape();
  strokeWeight(6);
  for (let i = 30; i < width - windowHeight - 50; i++) {
    beginShape();
    let theXCord = i - 1;
    stroke(0, 0, Math.abs(calculateSine(theXCord, frameCount)));
    vertex(theXCord, presentSine(calculateSine(theXCord, frameCount)));
    theXCord = i;
    vertex(theXCord, presentSine(calculateSine(theXCord, frameCount)));
    endShape();
    document.getElementById("preview").style.background = `rgb(0, 0, ${Math.abs(
      calculateSine(theXCord, frameCount)
    )})`;
    document.getElementById("preview").innerHTML = `<div>${Math.round(
      Math.abs(calculateSine(theXCord, frameCount))
    )}</div>`;
  }
  fill(225);
  noStroke();
  rect(0, 0, 40, windowHeight);

  fill(0);
  for (let i = 0; i < 10; i++) {
    textAlign("center");
    textSize(12);
    text(`${i * 50}`, 20, windowHeight / 2 - i * 50 - 6, 5, 40);
    if (i != 0) {
      text(`-${i * 50}`, 20, windowHeight / 2 + i * 50 - 6, 5, 24);
    }
  }
}

function mouseClicked() {
  externalMultiplier = 255 * Math.random() * 2;
}

Pusher.logToConsole = true;

var pusher = new Pusher("9e9ba095c4dd756509de", {
  cluster: "ap1",
});

var channel = pusher.subscribe("main-channel");
channel.bind(`${currentState}-update`, function (data) {
  externalMultiplier = parseFloat(data["ex-multi"]);
  console.log(externalMultiplier);

  externalAddition = parseFloat(data["ex-add"]);

  internalAddition = parseFloat(data["int-add"]);

  internalMultiplier = parseFloat(data["int-multi"]);
});
