import { getWordOfTheDay } from "../db/index";
import { App } from "../utils/slack";
import { checkGuess } from "../utils/checkGuess";
import moment from "moment";
import convertToSquares, { blankSquares } from "../utils/convertToSquares";
import { updateScores } from "../services/updateScores";

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
        say("🏆 You did it, see you tomorrow champ! 👋");
      } else if (currentPlayer.status === "lose") {
        say("👾 Game Over, see you tomorrow! 👋");
      } else {
        const result = checkGuess(guess, wordOfTheDay.word);
        if (result.type === "invalid") {
          //wtf, copilot suggested this w/ the emoji
          say("🤔 Invalid guess, please try again!");
          return;
        }

        currentPlayer.guesses = currentPlayer.guesses
          ? [...currentPlayer.guesses, guess]
          : [guess];

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
            say(`You guessed right! Congratulations 🏆`);
            break;
          case "wrong":
            if (currentPlayer.guesses.length === 6) {
              currentPlayer.status = "lose";
              say(`You lose 😵 The word was **${wordOfTheDay.word}**`);
            } else if (currentPlayer.guesses.length > 6) {
              say("You are out of guesses!");
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
