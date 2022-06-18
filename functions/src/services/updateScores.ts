import { addToLeaderboard, addToNotify } from "../db";
import { recordMatch } from "../db/userProfile";
import { Match } from "../events/messages";

export async function updateScores(report: Match) {
  const userId = report.playerId;
  let updatedProfile;

  updatedProfile = await recordMatch(report);
  if (report.status === "win") {
    addToNotify(userId);
    addToLeaderboard(userId, updatedProfile.score);
  }

  return;
}
