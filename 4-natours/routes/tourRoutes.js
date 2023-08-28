const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('../routes/reviewRoutes')

// POST /tour/23fa4d/reviews
// GET /tour/23fa4d/reviews
// GET /tour/23fa4d/reviews/4fdsad3

// router
//     .route('/:tourId/reviews')
//     .post(
//         authController.protect,
//         authController.restrictTo('user'),
//         reviewController.createReview
//     );

const router = express.Router();

router.use('/:tourId/reviews/', reviewRouter);


// router.param('id', tourController.checkID);

// Create a checkBody middleware function
// Check if the body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

router
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getToursStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
    .route('/')
    .get(authController.protect, tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteTour
    );



module.exports = router;
