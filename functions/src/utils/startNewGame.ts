import { WORDLE_BOT_CHANNEL_NAME } from "./env";
import sendMessageToChannel from "./sendMessageToChannel";

function startNewGame() {
  // Pick the word of the day
  // Send a message to the channel about the new game
  sendMessageToChannel(
    ":large_green_square: New game of wordle available! :large_green_square:",
    WORDLE_BOT_CHANNEL_NAME
  );
}

export default startNewGame;
