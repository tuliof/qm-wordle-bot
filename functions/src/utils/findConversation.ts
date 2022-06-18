import { app } from "../utils/slack";
import { SLACK_BOT_OAUTH_TOKEN } from "./env";

// Find conversation ID using the conversations.list method
async function findConversation(name: string) {
  try {
    let conversationId: string = "";
    const result = (await app.client.conversations.list({
      token: SLACK_BOT_OAUTH_TOKEN,
    })) as any;

    for (const channel of result.channels) {
      if (channel.name === name) {
        conversationId = channel.id;
        // console.log("Found channel: ", JSON.stringify(channel));
        // console.log("Found conversation ID: " + conversationId);
        break;
      }
    }
    return conversationId;
  } catch (error) {
    console.error(error);
  }
}

export default findConversation;
