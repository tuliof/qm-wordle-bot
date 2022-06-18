import { getWordOfTheDay } from "../db/index";
import { App } from "../utils/slack";
import { checkGuess } from "../utils/checkGuess";
import moment from "moment";
import convertToSquares, { blankSquares } from "../utils/convertToSquares";
import { updateScores } from "../services/updateScores";
import { messages } from "../constants/messages";

export type Match = {
  playerId: string;
  guesses: string[];
  guessesColor: string[][];
  word: string;
  date: string;
  status: "win" | "lose" | "playing";
};

const initMessages = async (app: App) => {
  const wordOfTheDay = await getWordOfTheDay();

  const matches: Map<string, Match> = new Map();

  app.message(/[\s\S]*/, async ({ message, say }) => {
    try {
      const msg = message as any;

      if (!matches.get(msg.user)) {
        matches.set(msg.user, {
          playerId: msg.user,
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

      if (currentPlayer.status === "win") {
        say(messages.gameOverWin);
      } else if (currentPlayer.status === "lose") {
        say(messages.gameOverLost);
      } else {
        const result = checkGuess(guess, wordOfTheDay.word);
        if (result.type === "invalid") {
          //wtf, copilot suggested this w/ the emoji
          say(messages.invalid);
          return;
        }

        currentPlayer.guesses = currentPlayer.guesses ? [...currentPlayer.guesses, guess] : [guess];

        if (result.resultColorArray.length > 0) {
          currentPlayer.guessesColor.push(result.resultColorArray);
        }

        // Print the squares
        let squares = "";
        for (let i = 0; i < currentPlayer.guessesColor.length; i++) {
          squares += `${convertToSquares(currentPlayer.guessesColor[i])}\n`;
        }
        for (let i = currentPlayer.guesses.length; i < 6; i++) {
          squares += `${blankSquares()}\n`;
        }
        say(squares);

        switch (result.type) {
          case "correct":
            currentPlayer.status = "win";
            const score = `\n<@${msg.user}> ${currentPlayer.guesses.length}/6`;
            say(`${messages.correct}${score}`);
            break;
          case "wrong":
            if (currentPlayer.guesses.length === 6) {
              currentPlayer.status = "lose";
              const score = `\n<@${msg.user}> X/6`;
              say(`${messages.end.replace("wordOfTheDay", wordOfTheDay.word)}${score}`);
            } else if (currentPlayer.guesses.length > 6) {
              say(messages.outOfGuesses);
            }
            break;
        }
      }
      updateScores(currentPlayer);
      return;
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  });
};

export { initMessages };
