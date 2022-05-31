const express = require('express');
const visitController = require('../controllers/visitController');

const router = express.Router();
router.route('/').post(visitController.createVisit);
router.route('/:id/').post(visitController.fetchCarerDayVisit);
// http://127.0.0.1:1000/api/v1/visit/628208d487a56613c4d703fe?dateOfVisit= "2022-05-18"
router
  // .route('/:id/')
  // .get(visitController.fetchCarerDayVisit)
  .post(visitController.addServiceUserToVisit);

module.exports = router;
