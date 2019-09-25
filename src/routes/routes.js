const bodyParser = require('body-parser');
const cors = require('cors');
const moviesController = require('../controllers/movies');
const genresController = require('../controllers/genres');
const customersController = require('../controllers/customers');
const rentalsController = require('../controllers/rentals');
const { expressErrorHandler, pageNotFoundErrorHandler } = require('../middlewares/error-handler');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.options('*', cors());
    app.use('/movies', moviesController);
    app.use('/genres', genresController);
    app.use('/customers', customersController);
    app.use('/rentals', rentalsController);
    app.use(expressErrorHandler);
    app.use(pageNotFoundErrorHandler);
}
