const express = require('express');
const visitInformationController = require('../controllers/visitInformationController');

const router = express.Router();

router.route('/:id/').get(visitInformationController.getVisit);

router
  .route('/')

  .post(visitInformationController.createVisitInformation);
module.exports = router;
