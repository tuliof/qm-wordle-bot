import { app } from "./utils/slack";
import { initInteractive } from "./events/interactive";
import { initMessages } from "./events/messages";
import { initCommands } from "./events/commands";
import { SLACK_APP_PORT } from "./utils/env";
import { initEvents } from "./events/events";

initMessages(app);
initCommands(app);
initInteractive(app);
initEvents(app);

app.start(SLACK_APP_PORT).then(() => {
  console.log(`⚡️ Slack Bolt app is running on port ${SLACK_APP_PORT}!`);
});
