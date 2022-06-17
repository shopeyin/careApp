const express = require('express');
const visitController = require('../controllers/visitController');

const router = express.Router();
router.route('/').post(visitController.createVisit);
router.route('/add/:id').post(visitController.addServiceUserToVisit);
router.route('/delete/:id').post(visitController.deleteServiceUserFromVisit);
router
  .route('/:id/')
  .get(visitController.fetchAllCarerVisit)
  .post(visitController.fetchCarerDayVisit)
  .delete(visitController.deleteCarerVisit);

module.exports = router;

// router.route('/:id/search?date').post(visitController.fetchCarerDayVisit);
