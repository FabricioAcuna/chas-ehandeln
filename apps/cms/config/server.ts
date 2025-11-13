export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS", ["someKey1", "someKey2"]),
  },
  proxy: true,
  url: env("PUBLIC_URL", "http://localhost:1337"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "supersecret"),
    },
  },
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:19006",
      // Tillåt alla lokala nätverksadresser för fysiska enheter
      /^http:\/\/192\.168\.\d+\.\d+:\d+$/,
      /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/,
    ],
    credentials: true,
  },
});
