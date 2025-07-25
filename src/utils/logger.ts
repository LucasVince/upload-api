import winston from "winston";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp} ${level}: ${message}]`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "src/utils/logs/info.log",
            level: "info",
        }),
        new winston.transports.File({
            filename: "src/utils/logs/error.log",
            level: "error",
        }),
    ],
});
