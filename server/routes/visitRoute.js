const express = require('express');
const visitController = require('../controllers/visitController');

const router = express.Router();
router.route('/').post(visitController.createVisit);
router.route('/add/:id').post(visitController.addServiceUserToVisit);
router
  .route('/:id/')

  .post(visitController.fetchCarerDayVisit);
// router.route('/:id/');

module.exports = router;

// router.route('/:id/search?date').post(visitController.fetchCarerDayVisit);
