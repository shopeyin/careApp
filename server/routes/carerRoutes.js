const express = require('express');
const carerController = require('../controllers/carerController');

const router = express.Router();

router
  .route('/')
  .get(carerController.getAllCarers)
  .post(carerController.createCarer);

router.route('/login').post(carerController.loginCarer);

router
  .route('/:id/')
  .get(carerController.getCarer)
  .patch(carerController.updateCarer)
  .delete(carerController.deleteCarer);

module.exports = router;
