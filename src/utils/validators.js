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
        email: Joi.string().email().required().min(3).max(64).label("Customer email"),
        phone: Joi.string().required().label('Phone Nmber'),
        isGold: Joi.boolean().optional()
    });
    return schema.validate(customer);
}

function validateMovie(movie) {
    const schema = Joi.object({
        _id: Joi.string().optional(),
        title: Joi.string().required().min(3).max(50).label('Title'),
        genre: Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required()
        }),
        numberInStock: Joi.number().integer().required().min(1).max(100).label('Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate'),
        publishDate: Joi.date().optional(),
        like: Joi.boolean().optional(),
        imageUrl: Joi.string().uri().required()
    });
    return schema.validate(movie);
}

function validateRental(rental) {
    const schema = Joi.object({
        customerEmail: Joi.string().email().required().trim().label("Customer Email"),
        movieId: Joi.string().required().trim(),
        dateReturned: Joi.date().required().label('Return Date')
    });
    return schema.validate(rental);
}

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().trim().required().min(3).max(64).label('Name'),
        email: Joi.string().trim().email().required().min(3).max(255).label('Email'),
        phone: Joi.string().trim().required().min(6).max(16).label('Phone'),
        password: Joi.string().trim().required().min(6).max(1024).label('Password')
    });
    return schema.validate(user);
}

function validateAuth(user) {
    const schema = Joi.object({
        email: Joi.string().trim().email().required().min(3).max(255).label('Email'),
        password: Joi.string().trim().required().min(6).max(1024).label('Password')
    });
    return schema.validate(user);
}

module.exports = {
    validateMovie,
    validateGenre,
    validateCustomer,
    validateRental,
    validateUser,
    validateAuth
}