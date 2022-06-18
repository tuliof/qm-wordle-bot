import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GameData = "gamedata";
const NotifyList = "notifyList";

export async function getNotifyList() {
  const dmRef = doc(db, GameData, NotifyList);
  const dm = await getDoc(dmRef);
  return dm?.data()?.playerIds ?? [];
}
export async function addToNotify(userId: string) {
  const notifyList = await getNotifyList();
  const dmRef = doc(db, GameData, NotifyList);

  if (!notifyList.includes(userId)) {
    const dm = await setDoc(dmRef, {
      playerIds: [...notifyList, userId],
    });
  }

  return;
}
