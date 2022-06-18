// const firebase = require("firebase/app");
// const { getFirestore, collection, getDocs } = require("firebase/firestore/lite");
import * as dictionary from "../constants/valid_words.json";
import moment from "moment";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const db = getFirestore(app);

// exports.getSingleWord = async function () {
//   const c = await db.collection("word_bank").get();
//   const random = Math.floor(Math.random() * (c.size - 1) + 1);
//   const result = await db.collection("word_bank").limit(1).offset(random).get();
//   return result.word;
// };

export const GoodWordsDictionary = dictionary.validWords;

export async function getSingleWordArray() {
  const random = Math.floor(Math.random() * (GoodWordsDictionary.length - 1) + 1);
  return GoodWordsDictionary[random];
}

export let wordOfTheDay = {
  word: "",
  date: "",
};

export async function getWordOfTheDay() {
  const isNewDay = moment().diff(moment(wordOfTheDay.date), "days") > 0;
  if (wordOfTheDay.word.length === 0 || isNewDay) {
    const word = await getSingleWordArray();
    wordOfTheDay.word = word;
    wordOfTheDay.date = moment().format("YYYY-MM-DD");
  }
  return wordOfTheDay;
}
