const mongoose = require('mongoose');
const config = require('../config/config.json');

const connect = mongoose.connect(
    `${config.host}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = connect;