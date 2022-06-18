import * as dictionary from "../constants/valid_words.json";

type ColorCode = "grey" | "green" | "yellow";

type guessResult = {
  resultColorArray: string[];
  message: string;
  type: "correct" | "wrong" | "invalid";
};

const ValidWords = dictionary.validWords;

export function checkGuess(guess: string, answer: string): guessResult {
  const result: guessResult = {
    resultColorArray: [],
    message: "",
    type: "wrong",
  };
  let currentGuess = Array.from(guess);
  let rightGuess = Array.from(answer);

  if (guess.length != 5) {
    result.message = "Please enter a 5-letter word";
    result.type = "invalid";
    return result;
  }

  if (!ValidWords.includes(guess)) {
    result.message = "Please enter a valid word";
    result.type = "invalid";
    return result;
  }

  for (let i = 0; i < 5; i++) {
    let letterColor: ColorCode = "grey";

    let letterPosition = rightGuess.indexOf(currentGuess[i]);

    if (letterPosition === -1) {
      letterColor = "grey";
    } else {
      if (currentGuess[i] === rightGuess[i]) {
        letterColor = "green";
      } else {
        letterColor = "yellow";
      }
    }
    result.resultColorArray.push(letterColor);
  }

  if (guess === answer) {
    result.type = "correct";
  }

  return result;
}
