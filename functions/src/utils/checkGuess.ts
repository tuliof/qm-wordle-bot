import * as dictionary from "../constants/valid_words.json";

type ColorCode = "grey" | "green" | "yellow";

export type GuessResult = {
  resultColorArray: string[];
  message: string;
  type: "correct" | "wrong" | "invalid";
};

const ValidWords = dictionary.validWords;

export function checkGuess(guess: string, answer: string): GuessResult {
  const result: GuessResult = {
    resultColorArray: [],
    message: "",
    type: "wrong",
  };
  let currentGuess = Array.from(guess);
  let rightGuess: (string | undefined)[] = Array.from(answer);

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
  //initialize the result array with grey
  let colorAnswerArray: ColorCode[] = Array(5).fill("grey");

  //do up all the greens
  rightGuess.forEach((letter, i) => {
    if (letter === currentGuess[i]) {
      colorAnswerArray[i] = "green";
      rightGuess[i] = undefined;
    }
  });

  //do up all the yellows
  rightGuess.forEach((_, i) => {
    let matchIndex = rightGuess.indexOf(currentGuess[i]);
    if (matchIndex !== -1) {
      rightGuess[matchIndex] = undefined;
      colorAnswerArray[i] = "yellow";
    }
  });
  result.resultColorArray = colorAnswerArray;

  if (guess === answer) {
    result.type = "correct";
  }

  return result;
}
