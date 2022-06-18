const { App } = require("@slack/bolt");
const moment = require("moment");
require("dotenv").config();

const functions = require("firebase-functions");
const { getSingleWordArray } = require("./database");
const config = functions.config();

/*
This sample slack application uses SocketMode
For the companion getting started setup guide,
see: https://slack.dev/bolt-js/tutorial/getting-started
*/

// Initializes your app with your bot token and app token
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  port: process.env.PORT || 3000,
});

let wordOfTheDay = {
  word: "",
  date: "",
};

async function getWordOfTheDay() {
  const isNewDay = moment().diff(moment(wordOfTheDay.date), "days") > 0;
  if (wordOfTheDay.word.length === 0 || isNewDay) {
    const word = await getSingleWordArray();
    wordOfTheDay.word = word;
    wordOfTheDay.date = moment().format("YYYY-MM-DD");
  }
  return wordOfTheDay;
}

// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  const wotd = await getWordOfTheDay();
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.user}>!!! The word is ${wotd.word}`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          action_id: "button_click",
        },
      },
    ],
    text: `Hey there <@${message.user}>! The word is ${wotd.word}`,
  });
});

app.action("button_click", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
