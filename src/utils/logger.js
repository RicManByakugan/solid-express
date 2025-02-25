// src/utils/logger.js
const morgan = require("morgan");
const winston = require("winston");
const path = require("path");

// Configuration de Winston
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/combined.log"),
    }),
  ],
});

// Ajouter les logs console en développement avec couleurs
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...metadata }) => {
          let msg = `${timestamp} ${level}: ${message}`;
          if (Object.keys(metadata).length > 0) {
            msg += ` ${JSON.stringify(metadata)}`;
          }
          return msg;
        })
      ),
    })
  );
}

// Fonction pour définir la couleur du statut dans le format de Morgan
const getStatusColor = (status) => {
  if (status >= 500) return "\x1b[31m"; // Rouge
  if (status >= 400) return "\x1b[33m"; // Jaune
  if (status >= 300) return "\x1b[36m"; // Cyan
  return "\x1b[32m"; // Vert
};

// Fonction pour définir la couleur de la méthode
const getMethodColor = (method) => {
  switch (method) {
    case "GET":
      return "\x1b[32m"; // Vert
    case "POST":
      return "\x1b[33m"; // Jaune
    case "PUT":
      return "\x1b[34m"; // Bleu
    case "DELETE":
      return "\x1b[31m"; // Rouge
    default:
      return "\x1b[37m"; // Blanc
  }
};

// Reset color code
const RESET = "\x1b[0m";

// Middleware de logging personnalisé
const httpLogger = morgan((tokens, req, res) => {
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const status = tokens.status(req, res);
  const responseTime = tokens["response-time"](req, res);
  const timestamp = new Date().toISOString();

  const methodColor = getMethodColor(method);
  const statusColor = getStatusColor(status);

  return [
    `${timestamp}`,
    `${methodColor}${method}${RESET}`,
    url,
    `${statusColor}${status}${RESET}`,
    `${responseTime}ms`,
  ].join(" ");
});

// Fonctions de logging
const logError = (error, req) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    path: req?.originalUrl,
    method: req?.method,
    timestamp: new Date().toISOString(),
  });
};

const logInfo = (message, metadata = {}) => {
  logger.info({
    message,
    ...metadata,
    timestamp: new Date().toISOString(),
  });
};

const logWarning = (message, metadata = {}) => {
  logger.warn({
    message,
    ...metadata,
    timestamp: new Date().toISOString(),
  });
};

const logDebug = (message, metadata = {}) => {
  logger.debug({
    message,
    ...metadata,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  logger,
  httpLogger,
  logError,
  logInfo,
  logWarning,
  logDebug,
};
