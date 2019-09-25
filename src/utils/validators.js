const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().alphanum().required().min(3).label("Genre name"),
    });
    return schema.validate(genre);
}

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(64).label("Customer name"),
        phone: Joi.string().required().label('Phone Nmber'),
        isGold: Joi.boolean().optional()
    });
    return schema.validate(customer);
}

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required().min(3).max(50).label('Title'),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().integer().required().min(1).max(100).label('Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate'),
        publishDate: Joi.date().optional(),
        like: Joi.boolean().optional()
    });
    return schema.validate(movie);
}

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.string().required().label('Customer Id'),
        movieId: Joi.string().required().label('Movie Id')
    });
    return schema.validate(rental);
}

module.exports = {
    validateMovie,
    validateGenre,
    validateCustomer,
    validateRental
}