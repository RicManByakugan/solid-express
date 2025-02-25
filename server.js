const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const xss = require("xss-clean");
const path = require("path");
const {
  httpLogger,
  logInfo,
  logError,
  logWarning,
} = require("./src/utils/logger");
const config = require("./configuration/config.server");

const server = express();
const app = require("./src/app");

server.use(httpLogger);

// Configuration du rate limiting
const limiter = rateLimit(config.rateLimit);
server.use(limiter);

// Middleware pour parser les cookies
server.use(cookieParser());

// Configuration CSRF
// const csrfProtection = csrf(config.csrf);
// server.use(csrfProtection);

// Configuration CORS
server.use(cors(config.cors));

// Protection contre les attaques XSS
server.use(xss());

// Protection avec Helmet
server.use(helmet(config.helmet));

// Compression des réponses HTTP
server.use(compression());

// Parser pour JSON
server.use(express.json());

server.use(express.urlencoded({ extended: true }));

// Logging en développement
if (config.server.nodeEnv === "development") {
  server.use((req, res, next) => {
    if (req.body && Object.keys(req.body).length) {
      logInfo("Request body", { body: req.body, path: req.path });
    }
    next();
  });
}

// Middleware pour logger les requêtes
server.use((req, res, next) => {
  logInfo(`Incoming request`, {
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  // Logger la réponse
  res.on("finish", () => {
    const logMethod = res.statusCode >= 400 ? logWarning : logInfo;
    logMethod(`Request completed`, {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      responseTime: res.get("X-Response-Time"),
    });
  });

  next();
});

// Route for Media
server.use("/media", express.static(path.join(__dirname, "media")));

// Routes API
server.use("/api", app);

// Gestion des routes non trouvées
server.use((req, res) => {
  logWarning(`Route not found: ${req.originalUrl}`);
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Middleware de gestion d'erreurs
server.use((err, req, res, next) => {
  logError(err, req);

  // Envoi de la réponse d'erreur
  res.status(err.status || 500).json({
    status: "error",
    message:
      config.server.nodeEnv === "production"
        ? "Une erreur est survenue"
        : err.message,
    ...(config.server.nodeEnv === "development" && { stack: err.stack }),
  });
});

// Démarrage du serveur
server.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
