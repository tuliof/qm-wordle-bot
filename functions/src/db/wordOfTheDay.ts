import moment from "moment";
import { AnswerWords } from "../static/index";

export async function getSingleWordArray() {
  const random = Math.floor(Math.random() * (AnswerWords.length - 1) + 1);
  return AnswerWords[random];
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
