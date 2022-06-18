import { addToLeaderboard, addToNotify } from "../db";
import { recordMatch } from "../db/userProfile";
import { Match } from "../events/messages";
import { WORDLE_BOT_CHANNEL_NAME } from "../utils/env";
import sendMessageToChannel from "../utils/sendMessageToChannel";

export async function updateScores(report: Match) {
  const userId = report.playerId;
  let updatedProfile;

  updatedProfile = await recordMatch(report);
  const score = report.guesses.length;
  const finishingTries = score > 6 ? "x" : `${score}/6`;
  if (report.status === "win") {
    addToNotify(report);
    addToLeaderboard(userId, updatedProfile.score);
    sendMessageToChannel(
      `> <@${userId}> finished ${finishingTries} at ${updatedProfile.score} points`,
      WORDLE_BOT_CHANNEL_NAME
    );
  }

  return;
}
