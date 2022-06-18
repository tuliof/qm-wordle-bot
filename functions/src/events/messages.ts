import { App } from '../utils/slack';

const initMessages = (app: App) => {
  app.message(/[\s\S]*/, async ({ message, say }) => {
    try {
      const msg = message as any;
      say(`User ${msg.user} said: ${msg.text}`);
    } catch (error) {
      console.log('err');
      console.error(error);
    }
  });
};

export { initMessages };
