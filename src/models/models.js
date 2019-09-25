const mongoose = require('mongoose');

const Genre = mongoose.model('genres', {
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true
    }
});

const Customer = mongoose.model('customers', {
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 64,
        trim: true
    },
    phone: {
        type: String,
        minLength: 9,
        maxLength: 16,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Movie = mongoose.model('movies', {
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genres',
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    like: {
        type: Boolean,
        default: false
    }
});

const Rental = mongoose.model('rentals', {
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    // rentalFee: {
    //     type: Number,
    //     min: 0,
    //     required: true
    // }
});

module.exports = {
    Genre, Customer, Movie, Rental
}