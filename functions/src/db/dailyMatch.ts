import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const DailyMatch = "daily_match";

export async function getDailyMatch(userId: string) {
  const dmRef = doc(db, DailyMatch, userId);
  const dm = await getDoc(dmRef);
  return dm.data();
}
