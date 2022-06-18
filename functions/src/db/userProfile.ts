import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserProfile = "user_profile";

type UserProfile = {
  lastPlayed: string;
  maxStreak: number;
  played: number;
  streak: number;
  totalScore: number;
  won: number;
  won1: number;
  won2: number;
  won3: number;
  won4: number;
  won5: number;
  won6: number;
};

export async function getUserProfile(userId: string) {
  const dmRef = doc(db, UserProfile, userId);
  const dm = await getDoc(dmRef);
  return dm.data();
}
export async function updateUserProfile(
  updatedProfile: UserProfile,
  userId: string
) {
  const userProfile = (await getUserProfile(userId)) ?? ({} as UserProfile);
  const dmRef = doc(db, UserProfile, userId);

  if (userProfile) {
    const dm = await setDoc(dmRef, {
      ...userProfile,
      ...updatedProfile,
      lastPlayed: new Date().toISOString(),
    });
  }

  return;
}
export async function recordLoss(userId: string, turns: number) {
  const userProfile = (await getUserProfile(userId)) ?? ({} as UserProfile);
  const dmRef = doc(db, UserProfile, userId);

  const dm = await setDoc(dmRef, {
    ...userProfile,
    played: userProfile?.played ?? 0 + 1,
    streak: 0,
    lastPlayed: new Date().toISOString(),
    maxStreak: Math.max(userProfile?.maxStreak ?? 0, userProfile?.streak ?? 0),
  });

  return;
}
export async function recordWin(userId: string, turns: number) {
  const userProfile = (await getUserProfile(userId)) ?? ({} as UserProfile);
  const dmRef = doc(db, UserProfile, userId);

  const dm = await setDoc(dmRef, {
    ...userProfile,
    played: userProfile?.played ?? 0 + 1,
    streak: userProfile?.streak ?? 0 + 1,
    lastPlayed: new Date().toISOString(),
    totalScore: userProfile?.totalScore ?? 0 + (6 - turns),
    won: userProfile?.won ?? 0 + 1,
    maxStreak: Math.max(
      userProfile?.maxStreak ?? 0,
      userProfile?.streak ?? 0 + 1
    ),
    won1: userProfile?.won1 ?? 0 + (turns === 1 ? 1 : 0),
    won2: userProfile?.won2 ?? 0 + (turns === 2 ? 1 : 0),
    won3: userProfile?.won3 ?? 0 + (turns === 3 ? 1 : 0),
    won4: userProfile?.won4 ?? 0 + (turns === 4 ? 1 : 0),
    won5: userProfile?.won5 ?? 0 + (turns === 5 ? 1 : 0),
    won6: userProfile?.won6 ?? 0 + (turns === 6 ? 1 : 0),
  });

  return;
}
