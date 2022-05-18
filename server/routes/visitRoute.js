const express = require('express');
const visitController = require('../controllers/visitController');

const router = express.Router();
router.route('/').post(visitController.createVisit);

router
  .route('/:id/')
  .get(visitController.fetchCarerDayVisit)
  .post(visitController.addServiceUserToVisit);

module.exports = router;
