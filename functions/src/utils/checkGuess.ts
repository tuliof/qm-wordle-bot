import { GoodWordsDictionary } from "./database";

const ColorCode = {
  GREY: "grey",
  GREEN: "green",
  YELLOW: "yellow",
};

type guessResult = {
  resultColorArray: string[];
  message: string;
  type: "correct" | "wrong" | "invalid";
};

export function checkGuess(guess: string, answer: string): guessResult {
  const result: guessResult = {
    resultColorArray: [],
    message: "",
    type: "wrong",
  };
  let currentGuess = Array.from(guess);
  let rightGuess = Array.from(answer);
  let WORDS = GoodWordsDictionary; //this is the list of whitelisted words

  if (guess.length != 5) {
    result.message = "Please enter a 5-letter word";
    result.type = "invalid";
    return result;
  }

  if (!WORDS.includes(guess)) {
    result.message = "Please enter a valid word";
    result.type = "invalid";
    return result;
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
    result.resultColorArray.push(letterColor);
  }

  if (guess === answer) {
    result.type = "correct";
  }

  return result;
}
