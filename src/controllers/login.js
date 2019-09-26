const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const { validateAuth } = require('../utils/validators');

router.post('/', async (req, res, next) => {
    try {
        const { error } = validateAuth(req.body);
        if (error) {
            return res.status(404).json({ error: 1, message: error.details[0].message });
        }
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: 1, message: 'Incorrect email or password.' });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 1, message: 'Incorrect email or password.' });
        }
        const token = user.generateAuthToken();
        return res.header('x-auth-token', token).status(200).json(token);
    } catch (exc) {
        next(exc);
    }
});


module.exports = router;