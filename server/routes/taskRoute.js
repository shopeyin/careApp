const express = require('express');
const taskController = require('../controllers/TaskController');

const router = express.Router();
router.route('/').post(taskController.createTask);

router.route('/:id/').get(taskController.fetchAllTaskofaServiceUser);

//   .get(taskController.getAllTaskBy)
module.exports = router;
