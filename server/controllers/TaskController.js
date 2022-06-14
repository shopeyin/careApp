const Task = require('./../models/TaskModel');
const ServiceUser = require('./../models/ServiceUserModel');

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    
    const serviceuser = await ServiceUser.findByIdAndUpdate(req.params.id, {
      $push: { tasks: newTask._id },
    });

    res.status(201).json({
      status: 'success',
      data: {
        task: newTask,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.fetchAllTaskofaServiceUser = async (req, res) => {
  try {
    let serviceUserTask = await ServiceUser.findById(req.params.id)
      .populate('tasks')
      .exec();

   
    res.status(200).json({
      status: 'success',
      data: {
        task: serviceUserTask,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};


exports.deleteServiceUserTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',

      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};