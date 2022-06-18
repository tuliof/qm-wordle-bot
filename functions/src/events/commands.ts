import { App } from '../utils/slack';
import { formatMessage } from '../utils/format';

const initCommands = (app: App) => {
  app.command('/knowledge', async ({ command, ack, say }) => {
    try {
      await ack();
      say({
        blocks: [
          formatMessage('Yaaay! Found a FAQ with that keyword or question!'),
          formatMessage('*Question ❓*'),
          formatMessage('*Answer ✔️*'),
        ],
      });
    } catch (error) {
      console.log('err');
      console.error(error);
    }
  });
};

export { initCommands };
