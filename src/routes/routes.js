const bodyParser = require('body-parser');
const cors = require('cors');
const moviesController = require('../controllers/movies');
const genresController = require('../controllers/genres');
const customersController = require('../controllers/customers');
const rentalsController = require('../controllers/rentals');
const registerController = require('../controllers/register');
const authController = require('../controllers/login');
const { expressErrorHandler, pageNotFoundErrorHandler } = require('../middlewares/error-handler');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.options('*', cors());
    app.use('/api/movies', moviesController);
    app.use('/api/genres', genresController);
    app.use('/api/customers', customersController);
    app.use('/api/rentals', rentalsController);
    app.use('/api/register', registerController);
    app.use('/api/auth', authController);
    app.use(expressErrorHandler);
    app.use(pageNotFoundErrorHandler);
}
