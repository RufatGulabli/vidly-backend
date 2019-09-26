const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config.json');

const Genre = mongoose.model('genres', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true
    }
}));

const Customer = mongoose.model('customers', new mongoose.Schema({
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
    email: {
        type: String,
        minLength: 9,
        maxLength: 16,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
}));

const Movie = mongoose.model('movies', new mongoose.Schema({
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
}));

const Rental = mongoose.model('rentals', new mongoose.Schema({
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
}));

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255,
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 64,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 6,
        maxLength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

});
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        isAdmin: this.isAdmin
    }, secretKey, { expiresIn: "1d" });
    return token;
}

const User = mongoose.model('users', userSchema);

module.exports = { Genre, Customer, Movie, Rental, User };