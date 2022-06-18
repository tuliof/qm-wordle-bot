import findConversation from "./findConversation";
import { app } from "./slack";

async function sendMessageToChannel(message: string, channelName: string) {
  const conversationId = await findConversation(channelName);
  if (!conversationId) {
    throw new Error("Could not find conversation ID for channel: " + channelName);
  }
  const result = await app.client.chat.postMessage({
    channel: conversationId,
    text: message,
  });
}

export default sendMessageToChannel;
