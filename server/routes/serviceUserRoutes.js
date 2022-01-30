const express = require('express');
const serviceUserController = require('../controllers/serviceUserController');

const router = express.Router();

router.param('id', serviceUserController.CHECKID);

router
  .route('/')
  .get(serviceUserController.getAllServiceUsers)
  .post(
    serviceUserController.createServiceUser
  );
router
  .route('/:id/')
  .get(serviceUserController.getServiceUser)
  .patch(serviceUserController.updateServiceUser)
  .delete(serviceUserController.deleteServiceUser);

module.exports = router;
