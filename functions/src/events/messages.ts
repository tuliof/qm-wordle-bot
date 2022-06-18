import { getWordOfTheDay } from "../utils/database";
import { checkGuess } from "../utils/checkGuess";
import { App } from "../utils/slack";
import moment from "moment";
import convertToSquares from "../utils/convertToSquares";

type match = {
  player: string;
  guesses: string[];
  guessesColor: string[][];
  word: string;
  date: string;
  status: "win" | "lose" | "playing";
};

const initMessages = async (app: App) => {
  const wordOfTheDay = await getWordOfTheDay();

  const matches: Map<string, match> = new Map();

  app.message(/[\s\S]*/, async ({ message, say }) => {
    try {
      const msg = message as any;

      if (!matches.get(msg.user)) {
        matches.set(msg.user, {
          player: msg.user,
          word: wordOfTheDay.word,
          date: moment().format(),
          guesses: [],
          guessesColor: [],
          status: "playing",
        });
      }

      const currentPlayer = matches.get(msg.user)!;

      console.log("🌟 wordOfTheDay", wordOfTheDay.word);
      const guess = msg.text;
      const result = checkGuess(guess, wordOfTheDay.word);

      currentPlayer.guesses = currentPlayer.guesses ? [...currentPlayer.guesses, guess] : [guess];

      if (result.resultColorArray.length > 0) {
        currentPlayer.guessesColor.push(result.resultColorArray);
      }

      // Print the squares
      let squares = "";
      for (let i = 0; i < currentPlayer.guessesColor.length; i++) {
        squares += `${convertToSquares(currentPlayer.guessesColor[i])}\n`;
      }
      say(squares);

      switch (result.type) {
        case "correct":
          currentPlayer.status = "win";
          say(`You guessed right! Congratulations 🏆`);
          break;
        case "wrong":
          if (currentPlayer.guesses.length === 5) {
            currentPlayer.status = "lose";
            say(`You lose! The word was ${wordOfTheDay.word}`);
          }
          break;
        case "invalid":
          say(`Please enter a valid word`);
          break;
      }
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  });
};

export { initMessages };
