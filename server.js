const express = require('express');
const { errorLogger } = require('./src/utils/logger');
const connectToDataBase = require('./src/database/db_connection');
const app = express();
require('./src/routes/routes')(app);

const PORT = process.env.PORT || 6789;

connectToDataBase.then(() => { }).catch(err => console.error('Could not connect to MongoDB::', err));

process.on("unhandledRejection", exc => { throw exc });

process.on("uncaughtException", exc => {
    errorLogger.log({ level: "error", message: exc.message });
    console.log("Exit");
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});

app.listen(PORT, () => { });