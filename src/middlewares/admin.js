const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config.json');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    const user = jwt.decode(token, secretKey);
    if (!user.isAdmin) {
        return res.status(403).json('Access Denied.');
    }
    next();
}