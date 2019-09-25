const express = require('express');
const router = express.Router();
const { Movie, Genre } = require('../models/models');
const { validateMovie } = require('../utils/validators');

router.get('/', async (req, res, next) => {
    try {
        const movies = await Movie.find()
            .populate('genre', '-__v')
            .select('-__v');
        return res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id)
            .populate('genre', '-__v')
            .select('-__v');
        if (!movie) {
            return res.status(404).json({ error: 1, message: 'Movie with given id not found.' });
        }
        return res.status(200).json(movie);
    } catch (exc) {
        next(exc);
    }
});

router.post('/', [auth, admin], async (req, res, next) => {
    try {
        const { error } = validateMovie(req.body);
        if (error) {
            return res.status(404).json({ error: 1, message: error.details[0].message });
        }
        const genre = await Genre.findById(req.body.genre._id);
        if (!genre) {
            return res.status(404).json({ error: 1, message: 'Genre with given ID not exists.' });
        }
        const movie = new Movie({
            title: req.body.title,
            genre: req.body.genre._id,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        });
        const resp = await movie.save();
        return res.status(200).json({ error: 0, message: resp });
    } catch (exc) {
        next(exc);
    }
});

router.put('/:id', [auth, admin], async (req, res, next) => {
    try {
        console.log(req.body);
        const { error } = validateMovie(req.body);
        if (error) {
            return res.status(404).json({ error: 1, message: error.details[0].message });
        }

        const genre = await Genre.findById(req.body.genre._id);
        if (!genre) {
            return res.status(404).json({ error: 1, message: 'Genre with given ID not exists.' });
        }

        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: req.body.genre._id,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });
        if (!movie) {
            return res.status(404).json({ error: 1, message: 'Movie with given id not found.' });
        }
        return res.status(200).json(movie);
    } catch (exc) {
        next(exc);
    }
});

router.delete('/:id', [auth, admin], async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndRemove(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 1, message: 'Movie with given id not found.' });
        }
        return res.status(200).json(movie);
    } catch (exc) {
        next(exc);
    }
});

module.exports = router;