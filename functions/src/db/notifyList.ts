import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Match } from "../events/messages";

const GameData = "gamedata";
const NotifyList = "notifyList";

export type NotifyItem = {
  playerId: string;
  noGuesses: number;
  date: string;
  status: "win" | "lose" | "playing";
};

export async function getNotifyList() {
  const dmRef = doc(db, GameData, NotifyList);
  const dm = await getDoc(dmRef);
  return (dm?.data()?.playerMatches ?? []) as NotifyItem[];
}

export async function addToNotify(report: Match) {
  const notifyList = await getNotifyList();
  const dmRef = doc(db, GameData, NotifyList);

  const dm = await setDoc(dmRef, {
    playerMatches: [
      ...notifyList,
      {
        playerId: report.playerId,
        noGuesses: report.guesses.length,
        date: report.date,
        status: report.status,
      },
    ],
  });

  return;
}

export async function clearNotify() {
  const dmRef = doc(db, GameData, NotifyList);

  const dm = await setDoc(dmRef, {
    playerMatches: [],
  });
}
