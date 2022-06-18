import { App } from "@slack/bolt";

const initEvents = async (app: App) => {
  // Listen for users opening your App Home
  app.event("app_home_opened", async ({ event, client, logger }) => {
    try {
      // Call views.publish with the built-in client
      const result = await client.views.publish({
        // Use the user ID associated with the event
        user_id: event.user,
        view: {
          // Home tabs must be enabled in your app configuration page under "App Home"
          type: "home",
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text:
                  "*Welcome to WordleBot, <@" +
                  event.user +
                  "> :large_green_square::large_yellow_square::white_large_square:*",
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*Today's game of Wordle*\n__shows the players score for today__",
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*Your previous games*\n__shows last 5 games played__",
              },
            },
          ],
        },
      });

      logger.info(result);
    } catch (error) {
      logger.error(error);
    }
  });
};

export { initEvents };
