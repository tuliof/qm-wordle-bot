import { GuessWords, AnswerWords } from "../static/";

const ColorCode = {
  GREY: "grey",
  GREEN: "green",
  YELLOW: "yellow",
};

export function checkGuess(
  guess: string,
  guessesRemaining: number,
  answer: string
) {
  let currentGuess = Array.from(guess);
  let rightGuess = Array.from(answer);
  let resultColorArray = [];
  let correct = false;

  if (guess.length != 5) {
    console.log("Not enough letters!");
    return;
  }

  if (!GuessWords.includes(guess)) {
    console.log("Word not in list!");
    return;
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = ColorCode.GREY;

    let letterPosition = rightGuess.indexOf(currentGuess[i]);

    if (letterPosition === -1) {
      letterColor = ColorCode.GREY;
    } else {
      if (currentGuess[i] === rightGuess[i]) {
        letterColor = ColorCode.GREEN;
      } else {
        letterColor = ColorCode.YELLOW;
      }
    }
    resultColorArray.push(letterColor);
  }

  if (guess === answer) {
    console.log("You guessed right! Game over!");
    correct = true;
  } else {
    guessesRemaining -= 1;
  }

  return {
    resultColorArray,
    guessesRemaining: guessesRemaining - 1,
    correct: correct,
  };
}
