const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config.json');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ error: 1, message: 'Unauthorized request.' });
    }
    try {
        jwt.verify(token, secretKey);
        next();
    } catch (exc) {
        res.status(400).json({ error: 1, message: 'Invalid token.' });
    }
}