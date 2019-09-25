const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const mongoose = require('mongoose');
const { Rental, Movie, Customer } = require('../models/models');
const { validateRental } = require('../utils/validators');

Fawn.init(mongoose);

router.get('/', async (req, res, next) => {
    try {
        const rentals = await Rental.find()
            .populate('customer', '-__v')
            .populate('movie', '-__v')
            .select('-__v').sort('-dateOut');
        return res.status(200).json(rentals);
    } catch (exc) {
        next(exc);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const rental = await Rental.findById(req.params.id)
            .populate('customer', '__v')
            .populate('movie', '-__v')
            .select('-__v');
        if (!rental) {
            return res.status(404).json({ error: 1, message: 'Movie with given id not found.' });
        }
        return res.status(200).json(rental);
    } catch (exc) {
        next(exc);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { error } = validateRental(req.body);
        if (error) {
            return res.status(404).json({ error: 1, message: error.details[0].message });
        }
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) {
            return res.status(404).json({ error: 1, message: 'Invalid customer.' });
        }
        const movie = await Movie.findById(req.body.movieId);
        if (!movie) {
            return res.status(404).json({ error: 1, message: 'Invalid movie.' });
        }
        if (movie.numberInStock === 0) {
            return res.status(400).json({ error: 1, message: 'Movies no in stock.' });
        }
        const rental = new Rental({
            customer: req.body.customerId,
            movie: req.body.movieId,
            rentalFee: movie.dailyRentalRate
        });
        await Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        return res.status(200).json({ error: 0, message: rental });
    } catch (exc) {
        next(exc);
    }
});


module.exports = router;