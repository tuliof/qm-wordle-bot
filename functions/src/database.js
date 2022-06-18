// const firebase = require("firebase/app");
// const { getFirestore, collection, getDocs } = require("firebase/firestore/lite");

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

exports.getSingleWordArray = async function () {
  const words = ["acrid", "butte", "cable", "front", "froth", "intro", "lurid", "mourn", "prune"];
  const random = Math.floor(Math.random() * (words.length - 1) + 1);
  return words[random];
};
