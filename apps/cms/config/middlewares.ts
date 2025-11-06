export default [
  "strapi::errors",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "http://localhost:3000/", // din web-frontend
        "http://127.0.0.1:3000/", // fallback
        "http://localhost:19006/", // Expo (mobil)
        "http://127.0.0.1:19006/",
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
