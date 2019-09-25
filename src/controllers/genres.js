const express = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { Genre } = require('../models/models');
const { validateGenre } = require('../utils/validators');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const genres = await Genre
            .find()
            .sort('name')
            .select({ _id: true, name: true });

        res.status(200).json(genres);
    } catch (exc) {
        next(exc);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const genre = await Genre.findById(req.params.id).select('-__v');
        if (!genre) {
            return res.status(404).json({ error: 1, message: 'Genre with given id not found.' });
        }
        return res.status(200).json(genre);
    } catch (exc) {
        next(exc);
    }
});

router.post('/', [auth, admin], async (req, res, next) => {
    try {
        const { error } = validateGenre(req.body);
        if (error) {
            return res.status(404).json({ error: 1, message: error.details[0].message });
        }
        const genre = new Genre({ name: req.body.name });
        const resp = await genre.save();
        res.status(200).json({ error: 0, message: resp });
    } catch (exc) {
        next(exc);
    }
});

router.put('/:id', [auth, admin], async (req, res, next) => {
    try {
        const { error } = validateGenre(req.body);
        if (error) {
            return res.status(404).json({ error: 1, message: error.details[0].message });
        }
        const resp = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!resp) {
            return res.status(404).json({ error: 1, message: 'Genre with given id not found.' });
        }
        // const genre = await Genre.findById(req.params.id);
        // const resp = await genre.update({ name: req.body.name });
        return res.status(200).json(resp);

    } catch (exc) {
        next(exc);
    }
});

router.delete('/:id', [auth, admin], async (req, res, next) => {
    try {
        const resp = await Genre.findByIdAndRemove(req.params.id);
        if (!resp) {
            return res.status(404).json({ error: 1, message: 'Genre with given id not found.' });
        }
        return res.status(200).json(resp);
    } catch (exc) {
        next(exc);
    }
});

module.exports = router;