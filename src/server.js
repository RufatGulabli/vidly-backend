const express = require('express');
const app = express();
require('./routes/routes')(app);
const { errorLogger, consoleLogger } = require('./utils/logger');
const connectToDataBase = require('../src/database/db_connection');

const PORT = process.env.PORT || 8800;

connectToDataBase.then(() => console.info('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB::', err));

process.on("unhandledRejection", exc => {
    throw exc;
});

process.on("uncaughtException", exc => {
    errorLogger.log({ level: "error", message: exc.message });
    console.log("Exit");
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});

app.listen(PORT, () => {
    consoleLogger.log({
        level: "info",
        message: `Server is running on port ${PORT}`
    });
});