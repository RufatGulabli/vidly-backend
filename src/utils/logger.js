const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const consoleLogger = createLogger({
    format: combine(
        timestamp(),
        myFormat,
        prettyPrint()
    ),
    transports: [new transports.Console({ level: "debug" })]
});

const errorLogger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.printf(
            info => `${info.timestamp} => ${info.level}: ${info.message} ${info.error}`
        )
    ),
    transports: new transports.File({
        filename: `${__dirname}/../logs/errorLogs.log`,
        timestamp: true,
        handleExceptions: true
    })
});

module.exports = {
    consoleLogger,
    errorLogger
}