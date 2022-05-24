const express = require('express');
const visitInformationController = require('../controllers/visitInformationController');

const router = express.Router();

router
  .route('/')

  .post(visitInformationController.createVisitInformation);
module.exports = router;
