function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function decimalToHexString(number) {
  if (number < 0) {
    number = 0xffffffff + number + 1;
  }
  return number.toString(16).toUpperCase();
}

function renderConfetti() {
  confetti.render();
}

function generateTheQuestion() {
  if (Math.random() > 0.5) {
    // Decimal question with Hexadecimal answers

    document.getElementById("answer-holder").style.background = "#a633d6";
    document.getElementById("answer-header").innerText = "Hexadecimal";
    document.getElementById("question-holder").style.background = "#33d6a6";
    document.getElementById("question-header").innerText = "Decimal";

    let firstNumber = randomIntFromInterval(1, 127);
    let secondNumber = randomIntFromInterval(1, 127);
    let result = 0;
    let string = "";
    if (Math.random() > 0.5) {
      if (firstNumber > secondNumber) {
        result = firstNumber - secondNumber;
        string = `${firstNumber} - ${secondNumber} = ?`;
      } else {
        result = secondNumber - firstNumber;
        string = `${secondNumber} - ${firstNumber} = ?`;
      }
    } else {
      result = firstNumber + secondNumber;
      string = `${firstNumber} + ${secondNumber} = ?`;
    }
    document.getElementById("question").innerText = string;
    let answerLocation = randomIntFromInterval(0, 3);
    document.getElementById(`a-${answerLocation}`).innerText =
      decimalToHexString(result);
    document.getElementById(`a-${answerLocation}`).onclick = function () {
      alert(`🎉 Hooray! Well done, that's right!`);
      generateTheQuestion();
    };
    for (let x = 0; x < 4; x++) {
      if (x != answerLocation) {
        document.getElementById(`a-${x}`).innerText = decimalToHexString(
          randomIntFromInterval(0, 255)
        );
        document.getElementById(`a-${x}`).onclick = function () {
          alert(`😭 Oh no! Sadly, that's wrong :(`);
          generateTheQuestion();
        };
      }
    }
  } else {
    // Hexadecimal question with Decimal answers
    document.getElementById("answer-holder").style.background = "#33d6a6";
    document.getElementById("answer-header").innerText = "Decimal";
    document.getElementById("question-holder").style.background = "#a633d6";
    document.getElementById("question-header").innerText = "Hexadecimal";

    let firstNumber = randomIntFromInterval(1, 127);
    let secondNumber = randomIntFromInterval(1, 127);
    let result = 0;
    let string = "";
    if (Math.random() > 0.5) {
      if (firstNumber > secondNumber) {
        result = firstNumber - secondNumber;
        string = `${decimalToHexString(firstNumber)} - ${decimalToHexString(
          secondNumber
        )} = ?`;
      } else {
        result = secondNumber - firstNumber;
        string = `${decimalToHexString(secondNumber)} - ${decimalToHexString(
          firstNumber
        )} = ?`;
      }
    } else {
      result = firstNumber + secondNumber;
      string = `${decimalToHexString(firstNumber)} + ${decimalToHexString(
        secondNumber
      )} = ?`;
    }
    document.getElementById("question").innerText = string;
    let answerLocation = randomIntFromInterval(0, 3);
    document.getElementById(`a-${answerLocation}`).innerText = result;
    document.getElementById(`a-${answerLocation}`).onclick = function () {
      alert(`🎉 Hooray! Well done, that's right!`);
      generateTheQuestion();
    };
    for (let x = 0; x < 4; x++) {
      if (x != answerLocation) {
        document.getElementById(`a-${x}`).innerText = randomIntFromInterval(
          0,
          255
        );
        document.getElementById(`a-${x}`).onclick = function () {
          alert(`😭 Oh no! Sadly, that's wrong :(`);
          generateTheQuestion();
        };
      }
    }
  }
}

generateTheQuestion();
