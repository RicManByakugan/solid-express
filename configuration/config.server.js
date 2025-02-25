const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const config = {
  // Configuration de base du serveur
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    origin: process.env.ORIGIN || "*",
  },

  // Configuration pour express-rate-limit
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes par fenêtre de 15 minutes
  },

  // Configuration CORS
  cors: {
    origin: process.env.ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },

  // Configuration Helmet (Content Security Policy)
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  },

  // Configuration CSRF (commentée pour le moment comme dans votre code original)
  csrf: {
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    },
  },
};

module.exports = config;
