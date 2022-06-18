import { App } from "../utils/slack";
import { formatMessage } from "../utils/format";
import { getLeaderboard, getNotifyList } from "../db";
import { LeaderboardEntry } from "../db/leaderboard";
import { clearNotify, NotifyItem } from "../db/notifyList";
import { Match } from "./messages";

const title = "🏆 *QM Wordle Leaderboard* 🏆";
const middle = (place: number, name: string, score: number) =>
  `> ${place}. <@${name}> @ \`${score}\``;
const notifyTitle = "*QM Wordle Updates*";
const middleNotify = (match: NotifyItem) =>
  `> <@${match.playerId}> ${match.status} with ${match.noGuesses} guesses.`;

const initInteractive = (app: App) => {
  app.command("/leaderboard", async ({ command, ack, say }) => {
    try {
      await ack();
      const leaderboard = await getLeaderboard();
      const leaderboardString = `${title}\n${leaderboard
        .map((leaderboardEntry: LeaderboardEntry, index: number) =>
          middle(index + 1, leaderboardEntry.id, leaderboardEntry.score)
        )
        .join("\n")}`;

      console.log(leaderboard, leaderboardString);

      say({
        blocks: [formatMessage(leaderboardString)],
      });
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  });

  app.command("/recents", async ({ command, ack, say }) => {
    try {
      await ack();
      const notifyList = await getNotifyList();
      console.log(notifyList);
      const notifiedUsers = `${notifyTitle}\n${notifyList
        .map((match: NotifyItem) => middleNotify(match))
        .join("\n")}`;

      say({
        blocks: [formatMessage(notifiedUsers)],
      });

      clearNotify();
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  });
};

export { initInteractive };
