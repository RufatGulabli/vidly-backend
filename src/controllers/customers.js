const express = require('express');
const { Customer } = require('../models/models');
const { validateCustomer } = require('../utils/validators');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const customers = await Customer.find().select('-__v').sort('name');
        return res.status(200).json(customers);
    } catch (exc) {
        next(exc);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id).select('-__v');
        if (!customer) {
            return res.status(404).json({ error: 1, message: 'Genre with given id not found.' });
        }
        return res.status(200).json(customer);
    } catch (exc) {
        next(exc);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { error } = validateCustomer(req.body);
        if (error) {
            return res.status(404).json({ error: 1, message: error.details[0].message });
        }
        const customer = new Customer({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            isGold: req.body.isGold
        });
        const resp = await customer.save();
        return res.status(200).json({ error: 0, message: resp });
    } catch (exc) {
        next(exc);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { error } = validateCustomer(req.body);
        if (error) {
            return res.status(404).json({ error: 1, message: error.details[0].message });
        }
        const resp = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold ? req.body.isGold : false
        }, { new: true });

        if (!resp) {
            return res.status(404).json({ error: 1, message: 'Customer with given id not found.' });
        }
        return res.status(200).json(resp);
    } catch (exc) {
        next(exc);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const resp = await Customer.findByIdAndRemove(req.params.id);
        if (!resp) {
            return res.status(404).json({ error: 1, message: 'Customer with given id not found.' });
        }
        return res.status(200).json(resp);
    } catch (exc) {
        next(exc);
    }
});




module.exports = router;