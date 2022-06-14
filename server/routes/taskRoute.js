const express = require('express');
const taskController = require('../controllers/TaskController');

const router = express.Router();
router
  .route('/:id/')
  .post(taskController.createTask)
  .get(taskController.fetchAllTaskofaServiceUser)
  .delete(taskController.deleteServiceUserTask);
module.exports = router;
