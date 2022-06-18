import {
  getWordOfTheDay,
  getNotifyList,
  addToNotify,
  addToLeaderboard,
} from "../db/index";
import { App } from "../utils/slack";

const initMessages = (app: App) => {
  app.message(/[\s\S]*/, async ({ message, say }) => {
    try {
      const msg = message as any;
      const wotd = await getWordOfTheDay();
      const notifyList = await getNotifyList();
      const leaderboard = await addToLeaderboard(msg.user, 22);

      addToNotify(msg.user);

      say(`User ${msg.user} said>??: ${msg.text}`);
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  });
};

export { initMessages };
