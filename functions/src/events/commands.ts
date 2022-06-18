import { App } from "../utils/slack";
import startNewGame from "../utils/startNewGame";

const initCommands = (app: App) => {
  app.command("/start", async ({ command, ack, say }) => {
    console.log("start command!");
    await ack();
    startNewGame();
  });
};

export { initCommands };
