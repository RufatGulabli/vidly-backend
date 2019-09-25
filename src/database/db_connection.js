const mongoose = require('mongoose');
const config = require('../config/config.json');

const connect = mongoose.connect(
    `mongodb://${config.host}/${config.name}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = connect;