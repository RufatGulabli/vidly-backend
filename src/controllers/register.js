const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const { validateUser } = require('../utils/validators');

router.post('/', async (req, res, next) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(404).json({ error: 1, message: error.details[0].message });
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 1, message: 'User already exists.' });
        }
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);
        user = new User({
            email: req.body.email,
            name: req.body.name,
            password: encryptedPassword,
        });
        user = await user.save();
        const userToReturn = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        };
        const token = user.generateAuthToken();

        return res
            .header('x-auth-token', token)
            .header('access-control-expose-headers', 'x-auth-token')
            .status(200).json(userToReturn);

    } catch (exc) {
        next(exc);
    }
});


module.exports = router;