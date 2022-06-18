import { config } from "dotenv";

// read env vars
config();
const SLACK_APP_PORT = Number(process.env.SLACK_APP_PORT ?? 0);
const SLACK_BOT_OAUTH_TOKEN = String(
  process.env.SLACK_BOT_OAUTH_TOKEN ?? "invalid"
);
const SLACK_SIGNING_SECRET = String(
  process.env.SLACK_SIGNING_SECRET ?? "invalid"
);
const SLACK_APP_LEVEL_TOKEN = String(
  process.env.SLACK_APP_LEVEL_TOKEN ?? "invalid"
);
const FIREBASE_API_KEY = String(process.env.FIREBASE_API_KEY ?? "invalid");
const FIREBASE_AUTH_DOMAIN = String(
  process.env.FIREBASE_AUTH_DOMAIN ?? "invalid"
);
const FIREBASE_PROJECT_ID = String(
  process.env.FIREBASE_PROJECT_ID ?? "invalid"
);
const FIREBASE_STORAGE_BUCKET = String(
  process.env.FIREBASE_STORAGE_BUCKET ?? "invalid"
);
const FIREBASE_MESSAGING_SENDER_ID = String(
  process.env.FIREBASE_MESSAGING_SENDER_ID ?? "invalid"
);
const FIREBASE_APP_ID = String(process.env.FIREBASE_APP_ID ?? "invalid");

export {
  SLACK_APP_PORT,
  SLACK_BOT_OAUTH_TOKEN,
  SLACK_SIGNING_SECRET,
  SLACK_APP_LEVEL_TOKEN,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
};
