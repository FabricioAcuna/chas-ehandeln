export default [
  "strapi::errors",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "http://localhost:3000", // din web-frontend
        "http://127.0.0.1:3000", // fallback
        "http://localhost:19006", // Expo (mobil)
        "http://127.0.0.1:19006",
        // Tillåt alla lokala nätverksadresser för fysiska enheter (utveckling)
        /^http:\/\/192\.168\.\d+\.\d+:1337$/, // Strapi på lokalt nätverk
        /^http:\/\/192\.168\.\d+\.\d+:19006$/, // Expo på lokalt nätverk
        /^http:\/\/192\.168\.\d+\.\d+:3000$/, // Web på lokalt nätverk
        /^http:\/\/10\.\d+\.\d+\.\d+:1337$/, // Andra lokala nätverk
        /^http:\/\/10\.\d+\.\d+\.\d+:19006$/,
        /^http:\/\/10\.\d+\.\d+\.\d+:3000$/,
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeadersOnError: true,
    },
  },
  "strapi::security",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
