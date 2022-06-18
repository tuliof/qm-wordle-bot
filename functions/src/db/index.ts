import { getLeaderboard, addToLeaderboard } from "./leaderboard";
import { addToNotify, getNotifyList } from "./notifyList";
import { getWordOfTheDay } from "./wordOfTheDay";
import { getDailyMatch } from "./dailyMatch";
import { getUserProfile, updateUserProfile } from "./userProfile";
import { fireapp, db } from "./firebase";

export {
  getLeaderboard,
  addToLeaderboard,
  addToNotify,
  getNotifyList,
  getWordOfTheDay,
  getDailyMatch,
  getUserProfile,
  updateUserProfile,
  fireapp,
  db,
};
