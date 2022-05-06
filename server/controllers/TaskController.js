const Task = require('./../models/TaskModel');

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
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
    let task = await Task.find({
      serviceuser: req.params.id,
    })
      .populate('serviceuser')
      .exec();
    res.status(200).json({
      status: 'success',
      data: {
        task: task,
      },
    });

    console.log(task);
    console.log(task.length);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
