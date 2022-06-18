import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GameData = "gamedata";
const Leaderboard = "leaderboard";

type LeaderboardEntry = {
  id: string;
  score: number;
};

export async function getLeaderboard() {
  const dmRef = doc(db, GameData, Leaderboard);
  const dm = await getDoc(dmRef);
  return dm?.data()?.top ?? {};
}

export async function addToLeaderboard(userId: string, score: number) {
  const dmRef = doc(db, GameData, Leaderboard);
  const leaderboardDb = await getDoc(dmRef);
  let leaderboard = leaderboardDb.data()?.top ?? [];

  const insertIndex = leaderboard
    .sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score)
    .findIndex((player: LeaderboardEntry) => player.score < score);

  const existing = leaderboard.findIndex(
    (player: LeaderboardEntry) => player.id === userId
  );

  if (existing > -1) {
    //replace only if new score is higher, boot otherwise
    if (leaderboard[existing].score < score) {
      leaderboard = leaderboard.filter(
        (player: LeaderboardEntry) => player.id !== userId
      );
    } else {
      return;
    }
  }

  const newEntry = { id: userId, score };
  const newLeaderboard =
    insertIndex === -1
      ? leaderboard.concat(newEntry)
      : leaderboard
          .slice(0, insertIndex)
          .concat(newEntry)
          .concat(leaderboard.slice(insertIndex));

  const dm = await setDoc(dmRef, {
    top: newLeaderboard,
  });

  return newLeaderboard;
}
